import { auth } from './routes/auth'
import { dashboard } from './routes/dashboard'

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
