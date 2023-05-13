<template>
  <!-- global component: YES -->
  <!-- form && form.errors.has(name) ? form.errors.get(name) : '' -->
  <v-text-field
    density="comfortable"
    :error-messages="getErrors"
    persistent-placeholder
    @blur="handleBlur"
    @update:model-value="value = $event"
  >
    <template #label="{ label }">
      <span v-if="required" class="text-red font-weight-bold text-body-1 mt-1 me-1">*</span>
      {{ label }}
    </template>
  </v-text-field>
</template>

<script setup>
import { toRef, computed } from 'vue'
import { useField } from 'vee-validate'

// prettier-ignore
// Source: https://vee-validate.logaretm.com/v4/examples/ui-libraries#vuetify
const {
  value,
  handleBlur,
  errors
} = useField(toRef(props, 'name'), undefined)

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  form: {
    type: [Object, Boolean],
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const getErrors = computed(() => {
  if (errors.value.length) {
    return errors.value
  }

  const form = props.form

  return form && form.errors.has(props.name) ? form.errors.get(props.name) : ''
})
</script>
