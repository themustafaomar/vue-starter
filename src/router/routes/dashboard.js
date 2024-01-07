export const dashboard = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/layouts/dashboard.vue'),
    meta: {
      middleware: 'dashboard',
    },
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
        name: 'dashboard_charts',
        path: 'charts',
        component: () => import('@/pages/dashboard/charts.vue'),
      },
      {
        name: 'dashboard_widgets',
        path: 'widgets',
        component: () => import('@/pages/dashboard/widgets.vue'),
      },
      {
        name: 'dashboard_chat',
        path: 'chat',
        component: () => import('@/pages/dashboard/chat.vue'),
      },
      {
        name: 'dashboard_broadcasting',
        path: 'broadcasting',
        component: () => import('@/pages/dashboard/broadcasting.vue'),
      },
      {
        name: 'dashboard_layouts',
        path: 'layouts',
        component: () => import('@/pages/dashboard/layouts.vue'),
      },
      {
        name: 'dashboard_email_templates',
        path: 'email-templates',
        component: () => import('@/pages/dashboard/email-templates.vue'),
      },
      {
        name: 'users',
        path: 'users',
        component: () => import('@/pages/dashboard/users.vue'),
      },
      {
        name: 'dashboard_roles',
        path: 'roles',
        component: () => import('@/pages/dashboard/roles.vue'),
        meta: {
          role: 'super-admin | admin',
        },
      },
      {
        name: 'dashboard_permissions',
        path: 'permissions',
        component: () => import('@/pages/dashboard/permissions.vue'),
        meta: {
          role: 'super-admin | admin',
        },
      },
      {
        name: 'dashboard_profile',
        path: 'profile',
        component: () => import('@/pages/dashboard/profile.vue'),
      },
      {
        name: 'dashboard_notifications',
        path: 'notifications',
        component: () => import('@/pages/dashboard/notifications.vue'),
      },
      {
        name: 'dashboard_settings',
        path: 'settings',
        component: () => import('@/pages/dashboard/settings.vue'),
      },
    ],
  },
]
