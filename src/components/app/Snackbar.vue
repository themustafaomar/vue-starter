<template>
  <v-snackbar
    v-model="options.show"
    :color="options.color"
    :timeout="options.timeout"
    :location="options.location"
  >
    <v-icon v-if="options.color === 'red'" class="me-1">mdi-alert-circle-outline</v-icon>
    {{ options.message }}
    <template #actions>
      <v-btn color="white" variant="text" rounded ripple @click="appStore.snackbar.show = false">
        <v-icon size="18">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const options = computed(() => appStore.snackbar)
</script>
