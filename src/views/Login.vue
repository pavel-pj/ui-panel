<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';


    const router = useRouter();
    const authStore = useAuthStore();

    const form = ref({
      email: '',
      password: ''
    });

    const login = async () => {
      try {
        await authStore.login({email:form.value.email, password:form.value.password});
        // Перенаправление после успешного входа
        const redirect = router.currentRoute.value.query.redirect || '/dashboard';
        router.push(redirect);
      } catch (error) {
        console.error('Login failed:', error);
        // Обработка ошибки (показать сообщение пользователю)
      }
    };

</script>

<template>
{{form}}
  <form @submit.prevent="login">
    <div>
      <label>Email</label>
      <input v-model="form.email" type="email" required>
    </div>
    <div>
      <label>Password</label>
      <input v-model="form.password" type="password" required>
    </div>
    <button type="submit">SEND</button>
  </form>
</template>
