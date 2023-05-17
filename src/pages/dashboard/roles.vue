<template>
  <v-sheet rounded="lg" class="pa-5">
    <div class="d-flex align-center justify-space-between">
      <div>
        <h2 class="font-weight-medium text-h5">Roles</h2>
        <p class="text-medium-emphasis mb-3">
          Roles section where you can manage the user's roles.
        </p>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
import { useLoader } from '@/composables/loader'
import { onMounted } from 'vue'

const loader = useLoader()

onMounted(() => {
  loader.markAsLoaded()
})
</script>
