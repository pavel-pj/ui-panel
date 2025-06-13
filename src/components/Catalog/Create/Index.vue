<script setup lang="ts">
import { computed, ref,onMounted } from 'vue';
import { useHttpRequest } from '@/utils/http-request';
import {
  catalogCreateURL,
  catalogItemShowURL
} from '@/config/request-urls';
import {useRouter,useRoute} from 'vue-router';
import modalSpiner from '@/components/common/spiner/ModalSpiner.vue';
import PageSpiner from '@/components/common/spiner/PageSpiner.vue';


const router = useRouter();
const route = useRoute();
type Props = {
   isEdit:boolean
};
const props = defineProps<Props>();
const itemId =  route?.params?.catatog_id;

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
} = useHttpRequest();



onMounted(async () => {
  if (props.isEdit) {
    await fetchItemCatalog();
    formData.value = itemData.value?.[0];


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

  isLoading.value = true;
  const params = formData.value;

  const res = await sendRequest({
    url: catalogCreateURL(),
    method: 'POST',
    data: params
  });


  if (res?.isOk) {
    await router.push('catalog-index');
    //isLoading.value = false;
  } else {
    isLoading.value = false;
  }
};



const isPageSpiner = computed(()=>{
  if (!props.isEdit) {
    return false;
  }
  return (!itemData.value) ? true : false;
});

const pageOptions = computed (()=>  {
  const title = (props.isEdit) ? 'Edit catalog Item' : 'Create new Catalog';
  const buttonTitle = (props.isEdit) ? 'Update' : 'Create';

  return{
    title,
    buttonTitle
  };

});

</script>

<template>

  <h1 class="text-3xl mb-12"> {{pageOptions.title}}</h1>

  <PageSpiner :isSpiner="isPageSpiner" />
  <div class="w-[400px] my-6" v-if="!isPageSpiner" >
    <form @submit.prevent="">
      <div class="flex flex-col justify-start gap-4">
      <InputText type="text" v-model="formData.name" />
      <Button @click="createData" rounded > {{pageOptions.buttonTitle}} </Button>
    </div>

    </form>
  </div>

 <modalSpiner :isSpiner="isLoading" ></modalSpiner>
</template>
