<template>
  <!-- global component: YES -->
  <v-select
    density="comfortable"
    append-inner-icon="mdi-chevron-down"
    :error-messages="form.errors.has(name) ? form.errors.get(name) : ''"
  >
    <template #label="{ label }">
      <span v-if="required" class="text-red font-weight-bold text-body-1 mt-1 me-1">*</span>
      {{ label }}
    </template>
  </v-select>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  form: Object,
  required: Boolean,
})
</script>
