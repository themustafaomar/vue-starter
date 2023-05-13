export const auth = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/auth/login.vue'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/pages/auth/register.vue'),
  },
  {
    name: 'forgot_password',
    path: '/forgot-password',
    component: () => import('@/pages/auth/forgot-password.vue'),
  },
  {
    name: 'reset_password',
    path: '/password-reset/:token',
    component: () => import('@/pages/auth/password-reset.vue'),
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('@/pages/auth/test.vue'),
  },
].map((route) => ({
  ...route,
  meta: { middleware: 'dashboard:guest' },
}))
