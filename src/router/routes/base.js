export const base = [
  {
    name: 'base',
    path: '/',
    component: () => import('@/layouts/app.vue'),
    children: [
      {
        name: 'welcome',
        path: '',
        component: () => import('@/pages/index.vue')
      },
      {
        name: 'about',
        path: 'about',
        component: () => import('@/pages/pages/about.vue')
      },
      {
        name: 'blog',
        path: 'blog',
        component: () => import('@/pages/pages/blog.vue')
      }
    ]
  }
]
