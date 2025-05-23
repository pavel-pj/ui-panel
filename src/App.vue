<script setup >
import { RouterView,useRoute, useRouter  } from 'vue-router'
import { computed , onMounted, watch,ref } from "vue";
import AppLayout from '@/layouts/AppLayout.vue'
import AppLayoutReg from '@/layouts/AppLayoutReg.vue'
import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory } from 'vue-router';


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
      router.push('/login');
    } else {
      console.error('Ошибка при проверке аутентификации:', error);
    }
  }
});


</script>

<template>
    <router-view></router-view> <!-- Это обязательно! -->
</template>


