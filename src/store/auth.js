import { defineStore } from 'pinia';
import http from '@/http';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token') || null, // Загружаем токен из localStorage
  }),
  actions: {
    async login(formData) {
      try {
        // 1. Запрашиваем CSRF-куки (если нужно)
        await http.get('/sanctum/csrf-cookie');

        // 2. Отправляем логин/пароль
        const { data } = await http.post('/login', formData);

        // 3. Сохраняем токен и пользователя
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('auth_token', data.token);

        return data;
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
      }
    },
  },

    // Новый метод для проверки аутентификации
    async fetchUser() {
      try {
        if (!this.token) return null;

        const { data } = await http.get('/user');
        this.user = data;
        return data;
      } catch (error) {
        this.token = null;
        this.user = null;
        localStorage.removeItem('auth_token');
        throw error;
      }
    },

    async fetchProfile() {
      const { data } = await http.get('/profile');
      return data;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
    },

});