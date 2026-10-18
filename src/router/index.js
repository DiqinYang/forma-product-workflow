import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      meta: { section: 'catalogue' },
      component: () => import('../views/CatalogueView.vue'),
    },
    {
      path: '/review',
      meta: { section: 'review' },
      component: () => import('../views/ReviewView.vue'),
    },
    {
      path: '/activity',
      meta: { section: 'activity' },
      component: () => import('../views/ActivityView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
