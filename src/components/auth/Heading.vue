<template>
  <div class="text-center mb-6">
    <img
      class="mb-3"
      :src="`/${isDark ? 'logo' : 'logo'}.png`"
      :width="isDark ? 60 : 70"
      alt="Logo"
    />
    <h2 class="mb-2">{{ title }}</h2>
    <p class="text-grey">{{ description }}</p>
  </div>
</template>

<script setup>
import { useIsDark } from '@/composables/useIsDark'

const props = defineProps({
  title: String,
  description: String,
})
const isDark = useIsDark()
</script>
