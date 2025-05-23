<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import Button from 'primevue/button';

  const router = useRouter();
  const authStore = useAuthStore();

  const user = computed(() => authStore.user);

  const logout = async () => {
    await authStore.logout();
    router.push({ name: 'login' });
  };


</script>


<template>
  <Button v-slot="slotProps" asChild>
    <button
        v-bind="slotProps.a11yAttrs"
        class="rounded-lg bg-gradient-to-br from-primary-400 to-primary-700 active:from-primary-700 active:to-primary-900 text-white border-none px-6 py-3 font-bold hover:ring-2 cursor-pointer ring-offset-2 ring-offset-surface-0 dark:ring-offset-surface-900 ring-primary transition-all"
    >
      SIGN UP
    </button>
  </Button>
  <div>
    <h1>Welcome, {{ user.name }}!</h1>
    <button @click="logout">Logout</button>
  </div>
</template>