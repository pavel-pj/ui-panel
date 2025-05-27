<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import {
  catalogURL
} from '@/config/request-urls';
import { useHttpRequest } from '@/utils/http-request';

interface CatalogItem {
  id:string,
  name:string
}


const  {
  data: catalog,
  //loading,
  //error,
  sendRequest: sendData
} = useHttpRequest<CatalogItem[]>();

const tableData = ref<CatalogItem[]  >([]);

onMounted(async () => {
  console.log('onMounted start');
  const response = await sendData({ url: catalogURL() }    );

  if (response?.data) {
    tableData.value = Array.isArray(response.data)
      ? response.data
      : [response.data]; // Если пришел объект, превращаем в массив
  }


});



const create =()=>{

};

</script>
<template>
  <Button @click="create" label="Primary" rounded>New catalog</Button>

  <div class="card">
    <DataTable :value="tableData" tableStyle="min-width: 50rem">
      <Column field="id" header="Code"></Column>
      <Column field="name" header="Name"></Column>

    </DataTable>
  </div>
</template>
