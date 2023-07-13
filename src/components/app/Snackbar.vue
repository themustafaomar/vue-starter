<template>
  <v-snackbar
    v-model="options.show"
    :color="options.color"
    :timeout="options.timeout"
    :location="options.location"
  >
    <v-icon class="me-1">{{ icon }}</v-icon>
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
const icon = computed(() => {
  let _icon = 'mdi-'
  if (options.value.color === 'primary') {
    _icon += 'check-circle-outline'
  } else if (options.value.color === 'info') {
    _icon += 'information-slab-circle-outline'
  } else if (options.value.color === 'red') {
    _icon += 'alert-circle-outline'
  }
  return _icon
})
</script>
