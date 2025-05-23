import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from "vue";
import { useAuthStore } from '@/store/auth';

/*
const routes = [
    {
        path: "/",
        name: "main",
        component: defineAsyncComponent(
            () => import('@/views/HomePage.vue'),
        ),

    },
    {
        path: "/reg",
        name: "registration",
        component: defineAsyncComponent(
            () => import('@/views/registrationForm.vue'),
        ),
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});
*/

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { guest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    // другие маршруты
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Если маршрут требует аутентификации
  if (to.meta.requiresAuth) {
    console.log("SEFEF")
    try {
      // Проверяем, есть ли пользователь
      if (!authStore.authenticated) {
        // Пытаемся получить данные пользователя
        await authStore.fetchUser();
      }

      // Если пользователь авторизован - разрешаем переход
      if (authStore.authenticated) {
        next();
      } else {
        // Если нет - перенаправляем на страницу входа
        next({ name: 'login', query: { redirect: to.fullPath } });
      }
    } catch (error) {
      next({ name: 'login', query: { redirect: to.fullPath } });
    }
  }
  // Если маршрут только для гостей
  else if (to.meta.guest) {
    if (authStore.authenticated) {
      // Если пользователь авторизован - перенаправляем на главную
      next({ name: 'dashboard' });
    } else {
      next();
    }
  }
  // Для всех остальных маршрутов
  else {
    next();
  }
});

export default router;
