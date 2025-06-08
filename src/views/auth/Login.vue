<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
 

const router = useRouter();
const authStore = useAuthStore();

  interface Data {
    email:string,
    password:string
  }

const form  = ref<Data> ({
  email: '',
  password: ''
});

const isLoading = ref(false);

const login = async () => {
  try {
    isLoading.value = true;
    await authStore.login(form.value);
    // Перенаправление после успешного входа
    const redirect = router.currentRoute.value.query.redirect || '/dashboard';
    router.push(redirect as string);
  } catch (error) {
    console.error('My Login failed:', error);
    // Обработка ошибки (показать сообщение пользователю)
  }
};


</script>

<template>

  <form @submit.prevent="">
    <div class="flex flex-col gap-6">
      <div class="block text-2xl font-bold text-center my-6">Sign in to your account</div>
      <div>
        <label for="email" class="block pb-2">Email</label>

         <InputText type="text" v-model="form.email"  variant="filled"  class="w-full"/>
      </div>
      <div>
        <label for="password" class="block pb-2">Password</label>
        <InputText type="text" v-model="form.password"  variant="filled"  class="w-full"/>
      </div>
      <Button @click="login" label="Primary" rounded>Sign Up</Button>


    </div>
  </form>

</template>
