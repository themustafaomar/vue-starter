<template>
  <v-sheet width="300" class="mx-auto border rounded-lg pa-5 mt-16">
    Hi! want to
    <router-link to="/login" class="text-decoration-none text-primary">login?</router-link>
  </v-sheet>
</template>

<script>
export default {
  beforeRouteEnter(_to, _from, next) {
    return next('/login')
  },
}
</script>
