<template>
  <v-sheet class="text-center mt-16">
    <h1>404</h1>
    <h2>Page not found</h2>
    <p>
      The page you're looking for doesn't exist,
      <a href="#" @click.prevent="$router.go(-1)">go back!</a>
    </p>
  </v-sheet>
</template>
