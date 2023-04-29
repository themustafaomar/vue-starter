<template>
  <v-snackbar
    v-model="options.show"
    :color="options.color"
    :timeout="options.timeout"
    :location="options.location"
  >
    {{ options.message }}
    <template #actions>
      <v-btn color="white" variant="text" @click="state.app.snackbar.show = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const { state } = useStore()
const options = computed(() => state.app.snackbar)
</script>
