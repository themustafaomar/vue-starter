export const auth = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/auth/login.vue')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/pages/auth/register.vue')
  }
].map((route) => ({
  ...route,
  meta: { middleware: 'auth:guest' }
}))
