<template>
  <div class="d-flex align-center justify-space-between px-5 pb-5">
    <div>
      <h2 class="font-weight-medium text-h5 d-flex align-center text-grey-darken-3">
        {{ title }}
      </h2>
    </div>
    <slot name="actions"></slot>
  </div>
</template>

<script setup>
const props = defineProps({ title: String })
</script>
