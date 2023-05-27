import { auth } from './auth'
import { dashboard } from './dashboard'

export default [
  {
    name: 'welcome',
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  ...auth,
  ...dashboard,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/layouts/404.vue'),
  },
]
