<script setup lang="ts">

import { ref, onMounted, h} from 'vue';
import {useRouter} from 'vue-router';
import {
  catalogURL,
  deleteCatalogURL
} from '@/config/request-urls';
import { useHttpRequest } from '@/utils/http-request';
import ProgressSpinner from 'primevue/progressspinner';
import modalSpiner from '@/components/common/spiner/ModalSpiner.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';


const router = useRouter();

interface CatalogItem {
  id: string,
  name: string,

}

const confirm = useConfirm();
const toast = useToast();

const confirmDelete = () => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {

      await deleteItem();

      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
    },
    reject: () => {
      //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
};

const isSpiner = ref<boolean>(false);

const {
  data: catalog,
  loading,
  sendRequest: sendData
} = useHttpRequest<CatalogItem[]>();

const tableData = ref<CatalogItem[]>([]);


const {
  loading: sendDeleteLoading,
  error: sendDeleteError,
  sendRequest: sendDelete
} = useHttpRequest();


const dataToDelete = ref<any>('');

const openDelete =(data:any)=>{
  dataToDelete.value = data;
  confirmDelete();
};


const deleteItem = async () =>{

  isSpiner.value = true;

  const res = await sendDelete({
    url: deleteCatalogURL(dataToDelete.value?.id),
    method: 'DELETE'

  });

  if (res?.isOk) {
    await getCatalog();
    isSpiner.value = false;
  } else {
    isSpiner.value = false;
  }

};




onMounted(async () => {
  await getCatalog();
});

const getCatalog = async()=> {
  const response = await sendData({ url: catalogURL() });

  if (response?.data) {
    tableData.value = Array.isArray(response.data)
      ? response.data
      : [response.data];
  }
};


const create = () => {
  router.push('catalog-create');
};

</script>
<template>

<Button @click="create" label="Primary" rounded style="display:block">Create </Button>

<ProgressSpinner
 v-if="!catalog"
 style="width: 35px; height:35px; margin-top:2rem" strokeWidth="4"    fill="transparent"
 animationDuration="2s" aria-label="Custom ProgressSpinner" />

 <div class="card pt-6 " v-if="catalog" >
        <DataTable :value="catalog" tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-times " @click="openDelete(data)" severity="secondary"  ></Button>
                </template>
            </Column>
        </DataTable>
        <Toast />
    </div>
  <modalSpiner :isSpiner="isSpiner" ></modalSpiner>
   <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="card flex flex-wrap gap-2 justify-center">
       <!--<Button @click="confirm2()" label="Delete" severity="danger" outlined></Button>-->
    </div>
</template>
