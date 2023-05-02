<template>
  <v-sheet class="ma-5 pa-5" rounded="lg">
    <h3 class="text-grey-darken-3">
      <pre>{{ state.app.error }}</pre>
    </h3>
    <v-btn
      color="red"
      elevation="0"
      rounded="pill"
      class="mt-4"
      @click.prevent="state.app.error.show = false"
    >
      Return to previous page
    </v-btn>
  </v-sheet>
</template>

<script setup>
import { useStore } from 'vuex'

const { state } = useStore()
</script>
