<template>
  <v-sheet class="shadow-sm pa-5" rounded="lg">
    <div>
      <h2 class="font-weight-medium text-h5 d-flex align-center text-grey-darken-3">
        {{ title }}
      </h2>
    </div>
    <slot name="actions"></slot>
  </v-sheet>
</template>

<script setup>
const props = defineProps({ title: String })
</script>
