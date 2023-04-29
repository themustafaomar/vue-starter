export const profile = [
  {
    name: 'profile',
    path: '/profile',
    component: () => import('@/layouts/profile.vue'),
    meta: {
      middleware: 'auth',
    },
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('@/pages/profile/index.vue'),
      },
    ],
  },
]
