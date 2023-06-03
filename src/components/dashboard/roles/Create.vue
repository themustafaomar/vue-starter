<template>
  <app-dialog ref="dialog" title="Add new role">
    <v-card-text>
      <!-- Attention: working on fixing the initial error border -->
      <app-text-field
        v-model="form.name"
        :form="form"
        name="name"
        label="Role Name"
        placeholder="Enter the role name"
        hide-details
        required
      ></app-text-field>
    </v-card-text>

    <template #actions="{ close }">
      <v-btn @click="close" variant="flat" color="red">Cancel</v-btn>
      <v-btn
        @click="create"
        :disabled="form.busy || !isValid"
        :loading="form.busy"
        variant="flat"
        color="primary"
      >
        Add role
      </v-btn>
    </template>
  </app-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@/composables/useForm'
import { useValidator } from '@/composables/useValidator'
import { createRoleValidation } from '@/validations/roles'
import AppDialog from '@/components/app/Dialog.vue'

const dialog = ref(null)
const { handleSubmit, isValid } = useValidator(createRoleValidation)
const form = useForm({
  name: '',
})

// Functions

const create = handleSubmit(() => {
  // ..
})

defineExpose({
  open: () => dialog.value.show(),
})
</script>
