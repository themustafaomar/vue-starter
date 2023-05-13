<template>
  <v-text-field
    @blur="handleBlur"
    @update:model-value="value = $event"
    density="comfortable"
    :error-messages="getErrors"
    persistent-placeholder
  >
    <template #label="{ label }">
      <span v-if="required" class="text-red font-weight-bold text-body-1 mt-1 me-1">*</span>
      {{ label }}
    </template>
  </v-text-field>
</template>

<script setup>
import { computed } from 'vue'
import { useField } from 'vee-validate'

// props
const props = defineProps({
  name: { type: String, required: true },
  form: { type: [Object, Boolean], default: false },
  required: { type: Boolean, default: false },
})

// Using vee-validate to handle validation.
// Source: https://vee-validate.logaretm.com/v4/examples/ui-libraries#vuetify
const { value, errors, handleBlur } = useField(props.name)

// Well, this function whether getting the client-side
// validation errors using vee-validate or getting the
// back-end validation errors using vform.
const getErrors = computed(() => {
  if (errors.value.length) {
    return errors.value
  }

  const form = props.form

  // prettier-ignore
  return form && form.errors.has(props.name)
    ? form.errors.get(props.name)
    : ''
})
</script>
