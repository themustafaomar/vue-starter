<template>
  <Field :name="name" v-slot="{ field, errors }">
    <!-- @blur="handleBlur" -->
    <v-text-field
      @update:model-value="form.errors.set(name)"
      v-bind="$attrs"
      density="comfortable"
      persistent-placeholder
      :error-messages="errors.length ? errors : getBackendErrors"
      :label="$attrs.label || generateLabel"
    >
      <template #label="{ label }">
        <span v-if="required" class="text-red font-weight-bold text-body-1 mt-1 me-1">*</span>
        <span class="text-capitalize">{{ label }}</span>
      </template>
    </v-text-field>
  </Field>
</template>

<script setup>
import { toRef, computed, onMounted } from 'vue'
import { Field } from 'vee-validate'

const props = defineProps({
  name: { type: String, required: true },
  form: { type: [Object, Boolean], default: false },
  required: { type: Boolean, default: false },
})

const getBackendErrors = computed(() => {
  const form = props.form

  // prettier-ignore
  return form && form.errors.has(props.name)
    ? form.errors.get(props.name)
    : ''
})

const generateLabel = computed(() => {
  const name = props.name

  if (!name) {
    return
  }

  return name.replace('_', ' ')
})
</script>
