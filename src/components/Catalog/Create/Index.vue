<script setup lang="ts">
import { ref } from 'vue';
import { useHttpRequest } from '@/utils/http-request';
import { catalogCreateURL } from '@/config/request-urls';
import {useRouter} from 'vue-router';


const router = useRouter();

interface Form {
    name: string,
}

const formData = ref<Form> ({
  name: ''
});

const {
  // loading ,
  // error ,
  sendRequest
} = useHttpRequest();

const isLoading = ref<boolean>(false);

const create = async() => {

  isLoading.value = true;
  const params = formData.value;

  let res;

  res = await sendRequest({
    url: catalogCreateURL(),
    method: 'POST',
    data: params
  });


  if (res?.isOk) {
    await router.push('catalog-index');
    isLoading.value = false;
  } else {
    isLoading.value = false;
  }
};



</script>

<template>
  CREATE
  <!--
  <h1 class="text-size-2xl my-4"> Create new Catalog </h1>
  <div class="rounded-xl p-4 border border-amber-100 shadow-xl w-[400px] my-6">
    <form @submit.prevent="">
      <div class="flex flex-col justify-start gap-4">
        <UInput v-model="formData.name" placeholder="Catalog name"  />
        <UButton type="button" label="Create"  :loading="isLoading"    @click="create" />
          </div>

    </form>
  </div>
  -->
</template>
