# Layouts

Layouts are the solid building block for pages

## How to add a new layout

### 1. Creating a layout

First, you will need to create a new file and call it whatever you want e.g: `account.vue` in `@/layouts/` directory

### 2. Creating the routes for this layout

Secondly, create a new route collection in `@/router/routes`, for convention name it `account.js` so it has the same name as the layout.

Example

```js
export const account = [
  {
    name: 'account',
    path: '/account',
    component: () => import('@/layouts/account.vue'),
  }
]
```

### 3. Creating pages for the layout

To start creating pages for the layout, we need to add the pages on the `children` property, example below.

```js
export const account = [
  {
    name: 'account',
    path: '/account',
    component: () => import('@/layouts/account.vue'),
    children: [
      {
        name: 'account_home',
        path: 'home',
        component: () => import('@/pages/account/home.vue'),
      }
    ]
  }
]
```

### 4. Import that routes in the main routes file in `@/router/routes.js`. example below.

```js
import { account } from './routes/account'

export default [
  ...
  ...account,
  ...
]
```

#### Next steps are coming soon.
