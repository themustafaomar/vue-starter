<template>
  <v-main class="d-flex justify-center mt-16 pt-16">
    <!-- wrapper -->
    <v-sheet color="background" class="h-100 text-center">
      <div>
        <h1 style="font-size: 4.75rem">404</h1>
        <h2 class="mb-4">Page Not Found</h2>
      </div>
      <p>
        Hey looks like the page you're looking for doesn't exist, do you want to
        <a href="#" @click.prevent="$router.go(-1)">go back!</a>
      </p>
    </v-sheet>
    <!-- end wrapper -->
  </v-main>
</template>
