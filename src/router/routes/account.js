export const account = [
  {
    name: 'account',
    path: '/account',
    component: () => import('@/layouts/account.vue'),
    meta: { middleware: 'auth' },
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/pages/account/home.vue')
      },
      {
        name: 'notifications',
        path: 'notifications',
        component: () => import('@/pages/account/notifications.vue')
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('@/pages/account/settings.vue')
      }
    ]
  }
]
