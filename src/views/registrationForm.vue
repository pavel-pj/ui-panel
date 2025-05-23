<script setup lg="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import axios from 'axios';

  const data = ref({
    email: '',
    password: '',
  });

  const login = async ()=> {

    try {
      // Отправка POST-запроса с withCredentials
      const response = await axios.post('http://127.0.0.1:8000/api/login', data.value, {
        headers: {
          'Content-Type': 'application/json' // Указываем, что передаем JSON
        },
        withCredentials: true // Позволяет отправлять куки вместе с запросом
      });
      // Перенаправление на страницу профиля или домашнюю страницу
      //this.$router.push('/profile');
      console.log("LOGIN!")
    } catch (error) {
      console.log("Login failed: ", error);
      // обработка ошибок
    }
  }


</script>
<template>
  <div>

    <form @submit.prevent="login">
      <div class="flex flex-col gap-6">
        <div class="block text-2xl font-bold text-center my-6">Sign in to your account</div>
         <div>
          <label for="email" class="block pb-2">Email</label>
          <InputText id="email" v-model="data.email"  class="w-full" />
         </div>
        <div>
        <label for="password" class="block pb-2">Password</label>
        <InputText id="password" v-model="data.password"  class="w-full" />
        </div>
        <Button label="Create" type="submit"  class="bg-red-800"/>
      </div>
    </form>
  </div>
</template>