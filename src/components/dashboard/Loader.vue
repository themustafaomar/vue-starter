<template>
  <v-sheet rounded="lg" class="app-dashboard-loader position-relative ma-5 pa-5">
    <div class="d-flex align-center">
      <v-skeleton-loader type="list-item-avatar-two-line" class="flex-grow-1" max-width="65%" />
      <v-skeleton-loader type="actions" class="flex-grow-1" />
    </div>
    <v-skeleton-loader type="subtitle" />
    <v-skeleton-loader type="sentences" max-width="80%" />
    <v-skeleton-loader type="list-item-avatar-two-line" max-width="45%" />
    <v-skeleton-loader type="text" />
    <v-skeleton-loader type="list-item-avatar-three-line" max-width="75%" />
  </v-sheet>
</template>
