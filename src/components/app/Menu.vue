<template>
  <!-- This component is deprecated and will be removed as soon as possible -->
  <v-menu close-delay="100" location="bottom end" open-delay="60" open-on-hover>
    <template #activator="{ props }">
      <slot name="activator" v-bind="{ props }" />
    </template>

    <v-sheet class="overflow-hidden" border rounded>
      <slot />
      <!-- <app-list v-else nav :items="items" /> -->
    </v-sheet>
  </v-menu>
</template>

<script setup>
// Components
import AppList from '@/components/app/List.vue'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
