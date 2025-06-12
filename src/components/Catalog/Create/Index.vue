<script setup lang="ts">
import { ref } from 'vue';
import { useHttpRequest } from '@/utils/http-request';
import { catalogCreateURL } from '@/config/request-urls';
import {useRouter} from 'vue-router';
import modalSpiner from '@/components/common/spiner/ModalSpiner.vue';


const router = useRouter();

interface Form {
  name: string,
}

const formData = ref<Form> ({
  name: ''
});

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

</script>

<template>

  <h1 class="text-size-2xl my-4"> Create new Catalog </h1>
  <div class="    w-[400px] my-6">
    <form @submit.prevent="">
      <div class="flex flex-col justify-start gap-4">
      <InputText type="text" v-model="formData.name" />
      <Button @click="createData" rounded > Create </Button>
    </div>

    </form>
  </div>
 <modalSpiner :isSpiner="isLoading" ></modalSpiner>
</template>
