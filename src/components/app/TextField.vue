<template>
  <!-- global component: YES -->
  <v-text-field
    density="comfortable"
    :error-messages="form.errors.has(name) ? form.errors.get(name) : ''"
    persistent-placeholder
  >
    <template #label="{ label }">
      <span v-if="required" class="text-red font-weight-bold mt-1 text-body-1 me-1">*</span>
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
  form: { type: Object },
  required: { type: Boolean },
})
</script>
