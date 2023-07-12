<template>
  <app-sheet title="Notifications">
    <p class="font-weight-medium">
      <v-icon class="me-1">mdi-check-circle-outline</v-icon>
      Hey! I'm working very hard on notifications and other modules, and it will be available soon,
      stay tunned!
    </p>
  </app-sheet>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'

const loader = useLoader()

onMounted(() => {
  loader.markAsLoaded()
})
</script>
