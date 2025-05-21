import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from "vue";


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

export default router;