<template>
  <div>
    <h1>Welcome, {{ user.name }}!</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const user = computed(() => authStore.user);

    const logout = async () => {
      await authStore.logout();
      router.push('/login');
    };

    return { user, logout };
  }
};
</script>