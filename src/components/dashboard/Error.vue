<template>
  <v-sheet class="ma-5 pa-5" rounded="lg">
    <h3 class="text-grey-darken-3">
      <pre>{{ appStore.error }}</pre>
    </h3>
    <v-btn
      color="red"
      elevation="0"
      rounded="pill"
      class="mt-4"
      @click.prevent="appStore.error.show = false"
    >
      Return to previous page
    </v-btn>
  </v-sheet>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>
