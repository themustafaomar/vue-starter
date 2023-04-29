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
    name: '_profile_',
    path: '/admin/home',
    component: () => import('@/layouts/profile.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('@/pages/404.vue'),
  },
]
