<template>
  <!-- global component: YES -->
  <v-select
    @blur="handleBlur"
    @update:model-value="value = $event"
    density="comfortable"
    append-inner-icon="mdi-chevron-down"
    :error-messages="getClientOrBackEndErrors"
  >
    <template #label="{ label }">
      <span v-if="required" class="text-red font-weight-bold text-body-1 mt-1 me-1">*</span>
      {{ label }}
    </template>
  </v-select>
</template>

<script setup>
import { toRef, computed, onMounted } from 'vue'
import { useField } from 'vee-validate'

// prettier-ignore
// Source: https://vee-validate.logaretm.com/v4/examples/ui-libraries#vuetify
const {
  value,
  handleBlur,
  errors
} = useField(toRef(props, 'name'), undefined)

const props = defineProps({
  name: { type: String, required: true },
  form: { type: [Object, Boolean], default: false },
  required: { type: Boolean, default: false },
})

// Well, this function whether getting the client-side
// validation errors using `vee-validate` or getting the
// back-end validation errors via `vform`.
const getClientOrBackEndErrors = computed(() => {
  if (errors.value.length) {
    return errors.value
  }

  const form = props.form

  // prettier-ignore
  return form && form.errors.has(props.name)
    ? form.errors.get(props.name)
    : ''
})

// Handle initial data coming from the `vform` we need to do this because the initial
// data not passed to `vee-validate` hence, `meta.valid` will be always `false`, we don't want
// this to happen. so, what we're doing here is force update the value of `vee-validate`
onMounted(() => {
  let _value = props.form[props.name]

  if (_value === '' || _value === null) {
    return
  }

  value.value = _value
})
</script>
