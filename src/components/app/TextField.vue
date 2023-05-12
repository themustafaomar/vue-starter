<template>
  <!-- global component: YES -->
  <v-text-field
    density="comfortable"
    :error-messages="form && form.errors.has(name) ? form.errors.get(name) : ''"
    persistent-placeholder
  >
    <template #label="{ label }">
      <span v-if="required" class="text-red font-weight-bold text-body-1 mt-1 me-1">*</span>
      {{ label }}
    </template>
  </v-text-field>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  form: {
    type: [Object, Boolean],
    default: false,
  },
  required: { type: Boolean },
})
</script>
