import { auth } from './routes/auth'
import { dashboard } from './routes/dashboard'

export default [
  {
    name: 'welcome',
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/pages/about.vue'),
  },
  ...auth,
  ...dashboard,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/404.vue'),
  },
]
