export const dashboard = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/layouts/dashboard.vue'),
    meta: { middleware: 'dashboard' },
    children: [
      {
        name: 'dashboard_home',
        path: '',
        component: () => import('@/pages/dashboard/index.vue'),
      },
      {
        name: 'dashboard_components',
        path: 'components',
        component: () => import('@/pages/dashboard/components.vue'),
      },
      {
        name: 'dashboard_comments',
        path: 'comments',
        component: () => import('@/pages/dashboard/comments/index.vue'),
      },
      {
        name: 'dashboard_layouts',
        path: 'layouts',
        component: () => import('@/pages/dashboard/layouts.vue'),
      },
    ],
  },
]
