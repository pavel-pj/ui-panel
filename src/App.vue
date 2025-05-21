<script setup >
import { RouterView,useRoute, useRouter  } from 'vue-router'
import { computed , onMounted, watch,ref } from "vue";
import AppLayout from '@/layouts/AppLayout.vue'
import AppLayoutReg from '@/layouts/AppLayoutReg.vue'

  const route = useRoute();
  const isReg = computed(()=>{
      return (route.path === '/reg') ? true : false;
  });

</script>

<template>

  <AppLayout v-if="!isReg">
    <RouterView />
  </AppLayout>

  <AppLayoutReg v-if="isReg">
    <RouterView />
  </AppLayoutReg>


</template>


