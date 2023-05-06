import { auth } from './routes/auth'
import { profile } from './routes/profile'
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
  ...profile,
  ...dashboard,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/404.vue'),
  },
]
