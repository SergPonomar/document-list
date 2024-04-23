import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/documents/:id',
      name: 'document',
      component: () => import('@/views/DocumentView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'тotFound',
      component: () => import('@/views/NotFound.vue')
    },
  ]
})

export default router
