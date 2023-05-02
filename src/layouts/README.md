# Layouts

Layouts are the solid building block for pages

## How to add a new layout

### Creating a layout

First, you will need to create a new file and call it whatever you want e.g: `account.vue` in `@/layouts/` directory

### Creating the routes for this layout

Secondly, create a new route collection in `@/router/routes`, for convention name it `account.js` so it has the same name as the layout.

Example

```js
export const account = [
  {
    name: 'account',
    path: '/account',
    component: () => import('@/layouts/account.vue'),
    children: [
      name: 'account_home',
      path: 'home',
      component: () => import('@/pages/account/home.vue'),
    ]
  }
]
```

<!-- @coming soon... -->
