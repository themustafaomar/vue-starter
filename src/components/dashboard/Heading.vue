<template>
  <v-sheet rounded="lg" class="d-flex align-center justify-space-between pa-5">
    <slot v-if="$slots.default"></slot>
    <div v-else>
      <h2 class="font-weight-medium text-h5">{{ title }}</h2>
      <p class="text-medium-emphasis">{{ description }}</p>
    </div>
    <slot name="action"></slot>
  </v-sheet>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
})
</script>
