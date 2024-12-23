import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/houses/:id',
      name: 'public-auction-item',
      component: () => import('../views/house/HomeViewItem.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import("@/views/AuthView.vue")
    }
  ],
})

export default router
