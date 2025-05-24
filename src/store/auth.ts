import { defineStore } from 'pinia';
import http from '@/http';
import { ref , computed } from 'vue';

export const useAuthStore = defineStore('auth', ()=> {

  const user = ref(null);
  const token = ref(localStorage.getItem('auth_token'));

  const  login = async (formData) => {
    try {
      // 1. Запрашиваем CSRF-куки (если нужно)
      await http.get('/sanctum/csrf-cookie');

      // 2. Отправляем логин/пароль
      const {data} = await http.post('/login', formData);

      // 3. Сохраняем токен и пользователя
      token.value = data.token;
      user.value = data.user;
      localStorage.setItem('auth_token', data.token);

      return data;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Новый метод для проверки аутентификации
  const fetchUser = async() => {
    try {
      if (!token.value) return null;

      const { data } = await http.get('/profile');
      user.value = data;
      return data;
    } catch (error) {
      token.value = null;
      user.value = null;
      localStorage.removeItem('auth_token');
      throw error;
    }
  }

  const logout =()=> {
    token.value = null;
    user.value = null;
    localStorage.removeItem('auth_token');
  }

  return {
    user,
    token,
    login,
    fetchUser,
    logout
  };
});
