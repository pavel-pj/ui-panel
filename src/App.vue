<script setup lang="ts">
import { RouterView, useRouter  } from 'vue-router'
import {  onMounted } from "vue";
import { useAuthStore } from '@/store/auth'

  const router = useRouter();
  const authStore = useAuthStore();

onMounted(async () => {
  try {
    // Проверяем, есть ли токен
    if (authStore.token) {
      await authStore.fetchUser(); // Загружаем данные пользователя
    }
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('Пользователь не авторизован, перенаправляем на /login');
      router.push({ name: 'login' });
    } else {
      console.error('Ошибка при проверке аутентификации:', error);
    }
  }
});


</script>

<template>
    <router-view></router-view> <!-- Это обязательно! -->
</template>


