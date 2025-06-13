<script setup lang="ts">
import { computed, ref,onMounted } from 'vue';
import { useHttpRequest } from '@/utils/http-request';
import {
  catalogCreateURL,
  catalogItemShowURL,
  updateCatalogURL
} from '@/config/request-urls';
import {useRouter,useRoute} from 'vue-router';
import modalSpiner from '@/components/common/spiner/ModalSpiner.vue';
import PageSpiner from '@/components/common/spiner/PageSpiner.vue';
import BreadCrumbs from '@/components/common/navigate/BreadCrumbs.vue';

const router = useRouter();
const route = useRoute();

type Props = {
   isEdit:boolean
};
const props = defineProps<Props>();

const itemId =  route?.params?.catatog_id as string;
const isSpiner = ref<boolean>(false);

interface Form {
  name: any,
}

const formData = ref<Form> ({
  name: ''
});

const {
  data : itemData,
  //loading: isItemLoading ,
  sendRequest: getDataRequest
} = useHttpRequest<{
  id:string,
  name:string
}>();



onMounted(async () => {
  if (props.isEdit) {
    await fetchItemCatalog();
    formData.value.name = itemData.value?.[0]?.name;


  }
});

const fetchItemCatalog = async () => {

  if (itemId) {
    await getDataRequest({ url: catalogItemShowURL(itemId) });
  }
};


const {
  loading: isLoading ,
  // error ,
  sendRequest
} = useHttpRequest();




const createData = async() => {

  isSpiner.value = true;
  const params = formData.value;

  let res = ref<any>();

  if (!props.isEdit) {

    res.value = await sendRequest({
      url: catalogCreateURL(),
      method: 'POST',
      data: params
    });


    if (res.value?.isOk) {
      await router.push('catalog-index');

    } else {
      isSpiner.value = false;
    }
  } else {

    res.value = await sendRequest({
      url: updateCatalogURL(itemId),
      method: 'PATCH',
      data: params
    });

    if (res.value?.isOk) {
      await fetchItemCatalog();
      isSpiner.value = false;
    } else {
      isSpiner.value = false;
    }

  }
};



const itemName = computed(() => itemData.value?.[0]?.name || '');

const isPageSpiner = computed(()=>{
  if (!props.isEdit) {
    return false;
  }
  return (!itemData.value) ? true : false;
});

const pageOptions = computed (()=>  {

  const title =ref<string>('Create new Catalog');
  if (props.isEdit) {
    title.value = `Edit item ${itemName.value}` ;
  }

  const buttonTitle = (props.isEdit) ? 'Update' : 'Create';

  return{
    title,
    buttonTitle
  };

});


const itemsBreadCrumbs =computed(()=>{

  return ([
    { label: 'Catalog' ,route: { name: 'catalog-index' }  },
    { label: itemName.value }
  ]) ;
});

</script>

<template>

<BreadCrumbs :items="itemsBreadCrumbs" />
<PageSpiner :isSpiner="isPageSpiner" />

  <div  v-if="!isPageSpiner">
  <h1 class="text-3xl mb-12"> {{pageOptions.title}}</h1>
  <div class="w-[400px] my-6"  >
    <form @submit.prevent="">
      <div class="flex flex-col justify-start gap-4">
      <InputText type="text" v-model="formData.name" />
      <Button @click="createData" rounded > {{pageOptions.buttonTitle}} </Button>
    </div>

    </form>
  </div>
</div>
 <modalSpiner :isSpiner="isLoading" ></modalSpiner>
</template>
