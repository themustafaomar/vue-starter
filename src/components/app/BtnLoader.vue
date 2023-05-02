<template>
  <v-progress-circular
    v-if="state"
    color="white"
    bg-color="transparent"
    indeterminate
    size="25"
    width="2"
  ></v-progress-circular>
  <template v-else>{{ text }}</template>
</template>

<script setup>
defineProps({
  state: {
    type: Boolean
  },
  text: {
    type: String
  }
})
</script>
