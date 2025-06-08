<script setup lang="ts">

import { ref, onMounted, h} from 'vue';
import {useRouter} from 'vue-router';
import {
  catalogURL,
  deleteCatalogURL
} from '@/config/request-urls';
import { useHttpRequest } from '@/utils/http-request';


const router = useRouter();

interface CatalogItem {
  id: string,
  name: string,

}


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

const deleteItem = async (data:any) =>{
  console.log(data.id);


  const res = await sendDelete({
    url: deleteCatalogURL(data.id),
    method: 'DELETE'

  });

  if (res?.isOk) {
    await getCatalog();
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
 <div class="card">
        <DataTable :value="catalog" tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="deleteItem(data)" severity="secondary" rounded></Button>
                </template>
            </Column>
        </DataTable>
        <Toast />
    </div>
</template>
