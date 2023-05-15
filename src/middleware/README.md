# Middleware

Middleware is a function that allows or prevents the user from accessing a route.

## How to add a new middleware

### 1. Creating a middleware

First, create a new file in `@/middleware/` and call it whatever you want e.g: `dashboard.js` example below.

```js
export default ({ store, router, from, to, next, guest }) => {
  if (true) {
    next()
  } else {
    router.push('/login')
  }
}
```

### 2. Register the middleware

Secondly, register the middleware by importing that middleware in `@/middleware/index.js` example below.

```js
...
import dashboard from './dashboard.js'
...

export default {
  ...
  dashboard
  ...
}
```
