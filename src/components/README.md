# Components

Components are reusable pieces of code.

## Convention

When you start importing a component into your `pages` or `layouts` whatever, you should follow these standards.

### 1. Components and pages must have the same folder structure

Imagine we have a dashboard folder in `@/pages/dashboard/` and we want to create a component.

Firstly, you should create a `dashboard` folder in `@/components/` so the final result would be `@/components/dashboard/` and `@/pages/dashboard/`.

They're now have the same folder, hurray!

### 2. Component declaration

Let's assume we're in `@/pages/dashboard/comments/index.vue` and we want to create a comments system component.

You must ask yourself the following:

- If this component is only one component it must be stored like this `@/components/dashboard/Comments.vue`

- If this comment has more than one component we're going to add it in a folder matching the same sequence like so.

<!-- prettier-ignore -->
components/
|- dashboard/
  |- comments/
    |- Comments.vue
    |- Comment.vue
    |- Reply.vue

The last step is to declare that component, the declaration must match the following pattern.

```html
<template>
  <!-- app (a default prefix) + folder name + component name -->
  <app-dashboard-comments></app-dashboard-comments>
</template>

<script>
  import AppDashboardComments from '@/components/dashboard/Comments.vue'

  export default {
    components: { AppDashboardComments },
  }
</script>
```

Notice: we're always adding `app` prefix before any kind of custom component in the whole project, this is a community standard to prevent conflicts with other libraries, you can read about it.
