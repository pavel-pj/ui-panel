<script setup ln="ts">
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/store/auth';
import Button from 'primevue/button';



const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

const logout = async () => {
  await authStore.logout();
  router.push({name: 'login'});
};

</script>


<template>
  <div class="flex items-center justify-between gap-2 px-6 py-4">
    <div class="flex-grow"></div>
    <div class="whitespace-nowrap">
      <h1 class="font-bold">Welcome, {{ user.name }}!</h1>
    </div>
    <div>
      <Button @click="logout" label="Primary" rounded>Logout</Button>
    </div>
  </div>

</template>