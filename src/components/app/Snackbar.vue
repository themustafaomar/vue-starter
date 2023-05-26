<template>
  <v-snackbar
    v-model="options.show"
    :color="options.color"
    :timeout="options.timeout"
    :location="options.location"
  >
    {{ options.message }}
    <template #actions>
      <v-btn color="white" variant="text" @click="appStore.snackbar.show = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const options = computed(() => appStore.snackbar)
</script>
