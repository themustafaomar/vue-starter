<template>
  <!-- global component: YES -->
  <v-select
    @update:model-value="setValue($event)"
    density="comfortable"
    append-inner-icon="mdi-chevron-down"
    :error-messages="getClientOrBackEndErrors"
    :label="$attrs.label || generateLabel"
  >
    <template #label="{ label }">
      <span v-if="required" class="text-red font-weight-bold text-body-1 mt-1 me-1">*</span>
      {{ label }}
    </template>

    <!-- 
      We want to use the Vuetify slots from our custom component
      The below dynamic template and slot sends these slots to the Vuetify.
      Supported slots: https://vuetifyjs.com/en/components/text-fields/#slots
    -->
    <template v-for="slotName in slotsNames" #[slotName]>
      <slot :name="slotName" :[slotName]="$attrs[slotName]"></slot>
    </template>
  </v-select>
</template>

<script setup>
import { computed, useSlots, onMounted } from 'vue'
import { useField } from 'vee-validate'

// prettier-ignore
// Source: https://vee-validate.logaretm.com/v4/examples/ui-libraries#vuetify
const {
  setValue,
  errors
} = useField(() => props.name)

const props = defineProps({
  name: { type: String, required: true },
  form: { type: [Object, Boolean], default: false },
  required: { type: Boolean, default: false },
})
const slots = useSlots()
const slotsNames = Object.keys(slots).filter((name) => name !== 'label')

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

const generateLabel = computed(() => {
  const name = props.name

  if (!name) {
    return
  }

  return name.replace('_', ' ')
})

// Handle initial data coming from the `vform` we need to do this because the initial
// data not passed to `vee-validate` hence, `meta.valid` will be always `false`, we don't want
// this to happen. so, what we're doing here is force update the value of `vee-validate`
onMounted(() => {
  const _value = props.form[props.name]

  if (_value === '' || _value === null || _value === undefined) {
    return
  }

  setValue(_value)
})
</script>
