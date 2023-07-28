<template>
  <!-- global component: YES -->
  <Field v-slot="{ errors }" :name="name">
    <v-autocomplete
      v-bind="$attrs"
      @update:model-value="form && form.errors.has(name) ? form.errors.set(name) : void 0"
      :error-messages="errors.length ? errors : getBackendErrors"
      :label="$attrs.label || generateLabel"
      density="comfortable"
      append-inner-icon="mdi-chevron-down"
      persistent-placeholder
    >
      <template #label="{ label }">
        <span v-if="required" class="text-red font-weight-bold text-body-1 mt-1 me-1">*</span>
        <span class="text-capitalize">{{ label }}</span>
      </template>

      <!--
        We want to use the Vuetify slots from our custom component
        The below dynamic template and slot sends these slots to the Vuetify.
        Supported slots: https://vuetifyjs.com/en/components/text-fields/#slots
      -->
      <template v-for="slotName in slotsNames" #[slotName]>
        <slot :name="slotName" :[slotName]="$attrs[slotName]"></slot>
      </template>
    </v-autocomplete>
  </Field>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { Field } from 'vee-validate'

const props = defineProps({
  name: { type: String, required: true },
  form: { type: [Object, Boolean], default: false },
  required: { type: Boolean, default: false },
})
const slots = useSlots()
const slotsNames = Object.keys(slots).filter((name) => name !== 'label')

// Get backend errors via vform
const getBackendErrors = computed(() => {
  const form = props.form

  // prettier-ignore
  return form && form.errors.has(props.name)
    ? form.errors.get(props.name)
    : ''
})

// Generate a label from a given name
const generateLabel = computed(() => props.name?.replace(/_/g, ' '))
</script>

<style lang="scss">
// A workaround for append inner icon issue
.v-autocomplete .v-field__append-inner .mdi-menu-down {
  display: none !important;
}
</style>
