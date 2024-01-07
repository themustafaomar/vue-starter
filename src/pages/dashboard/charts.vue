<template>
  <app-sheet title="Charts">
    I'm working very hard on a powerful charts collection, stay tunned!
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
