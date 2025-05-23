import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// Перехватчик для автоматической отправки CSRF-токена
http.interceptors.request.use((config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    config.headers['X-CSRF-TOKEN'] = localStorage.getItem('csrf_token') || '';
  }
  return config;
});

// Добавляем токен к каждому запросу
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token'); // Токен из localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;

