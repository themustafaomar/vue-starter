<template>
  <v-progress-circular
    v-if="state"
    :color="color"
    bg-color="transparent"
    indeterminate
    size="25"
    width="2"
  ></v-progress-circular>
  <template v-else>
    <slot>{{ text }}</slot>
  </template>
</template>

<script setup>
defineProps({
  state: Boolean,
  text: String,
  color: {
    type: String,
    default: 'white',
  },
})
</script>
