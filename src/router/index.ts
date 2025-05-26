import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      redirect: { name: 'login' } // Перенаправляем на именованный маршрут
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: { guest: true },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/Register.vue')
        }
      ]
    },

    {
      path: '/dashboard',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [

        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/Index.vue')
        },


       {
         path: 'catalog-articles',
         name: 'catalog-articles',
         component: () => import('@/components/Catalog/Index/Index.vue')
       }


      ]
    }
    // другие маршруты
  ]
});

router.beforeEach(async (to, from, next) => {
  console.log('Trying to navigate to:', to.path, 'matched:', to.matched)
  const authStore = useAuthStore();

  // Инициализируем состояние аутентификации
  ///const isAuthenticated = authStore.token  !== null;

  // Если маршрут требует аутентификации
  if (to.meta.requiresAuth) {
    console.log("ender")
    try {

      // Если есть токен, но нет данных пользователя - загружаем их
      if (authStore.token  && !authStore.user ) {
        console.log("enter 2")
        await authStore.fetchUser();
      }

      // Проверяем аутентификацию
      if (authStore.token && authStore.user) {
        console.log("enter 3")
        next();
        return; // Важно: завершаем выполнение
      } else {
        // Если аутентификация не прошла
        authStore.logout(); // Очищаем невалидные данные
        next({ name: 'login', query: { redirect: to.fullPath } });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      authStore.logout(); // Очищаем данные при ошибке
      next({ name: 'login' });
    }
  }
  // Если маршрут только для гостей
  if (to.meta.guest) {
    if (authStore.token) {
      next({ name: 'dashboard' });
      return;
    }
    next();
    return;
  }
  // Для всех остальных маршрутов
  else {
    next();
  }
});

export default router;
