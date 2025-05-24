import "./assets/styles/main.css";
import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";
import { createApp, type App as VueApp } from "vue"; // Указание типа для app
import App from "./App.vue";
import router from './router';
import { createPinia, type Pinia } from "pinia"; // Тип для pinia
import http from './http'; // Убедитесь, что http тоже имеет типы
//import { useAuthStore } from '@/store/auth';

const app: VueApp = createApp(App); // Явная типизация
const pinia: Pinia = createPinia();

// Типизация для PrimeVue (если есть @types/primevue)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".p-dark",
    },
  },
});

app.use(pinia);
app.use(router);

// Типизация для http (если используется, например, axios)
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: typeof http; // Добавляем $http в глобальную область Vue
  }
}
app.config.globalProperties.$http = http;

app.mount('#app');
