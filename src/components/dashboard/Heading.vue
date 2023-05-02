<template>
  <v-sheet class="d-flex align-center justify-space-between pa-5" rounded="lg">
    <slot v-if="$slots.hi" name="hi"></slot>
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
  description: String
})
</script>
