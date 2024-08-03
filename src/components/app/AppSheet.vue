<template>
  <v-sheet class="shadow-sm" rounded="lg">
    <!-- Header -->
    <div class="d-flex align-center justify-space-between px-5 py-4">
      <h2 v-if="!slots.header" class="font-weight-medium text-h5 text-grey-darken-3">
        {{ title }}
      </h2>
      <slot v-else name="header"></slot>
      <slot name="actions"></slot>
    </div>

    <v-divider v-if="!borderless" />

    <v-sheet
      v-if="slots.toolbar"
      color="background"
      class="d-flex justify-space-between pa-2"
      rounded="lg"
    >
      <slot name="toolbar"></slot>
    </v-sheet>

    <!-- Body -->
    <div :class="{ 'px-6 py-5': !table }">
      <slot></slot>
    </div>
  </v-sheet>
</template>

<script setup>
import { useSlots } from 'vue'

const slots = useSlots()

defineProps({
  title: String,
  table: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: false,
  },
})
</script>
