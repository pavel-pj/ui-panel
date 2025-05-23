import "./assets/styles/main.css";
import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import { createPinia } from "pinia";
import http from './http';
import { useAuthStore } from '@/store/auth';

const app = createApp(App);
const pinia = createPinia();

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".p-dark",
    },
  },
});

app.use(pinia); // Подключаем Pinia первым
app.use(router);

app.mount('#app'); // Просто монтируем приложение
