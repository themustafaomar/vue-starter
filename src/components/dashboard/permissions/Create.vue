<template>
  <v-dialog width="700">
    <v-card rounded="lg">
      <v-card-title>
        <h3 class="font-weight-regular text-h6">{{ compose.title }}</h3>
      </v-card-title>

      <Form
        ref="veeForm"
        @submit="saveOrUpdate"
        v-slot="{ meta }"
        :validation-schema="createPermissionValidation"
      >
        <v-card-text>
          <app-text-field
            v-model="form.name"
            :form="form"
            name="name"
            label="Permission Name"
            placeholder="Enter the permission name"
            hide-details
            required
          ></app-text-field>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-btn @click="compose.close()" variant="flat" color="red">Discard</v-btn>

          <v-btn
            type="submit"
            :disabled="!meta.valid || form.busy"
            :loading="form.busy"
            variant="flat"
            color="primary"
            class="ms-4"
          >
            {{ compose.action }}
          </v-btn>
        </v-card-actions>
      </Form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useAppStore } from '@/stores/app'
import { useForm } from '@/composables/useForm'
import { createPermissionValidation } from '@/validations/permissions'

const props = defineProps({ compose: Object })

const { notify } = useAppStore()
const form = useForm({
  name: '',
})

// Functions

const saveOrUpdate = () => {
  form
    .post('/roles')
    .then(() => {
      _reset()
    })
    .catch((error) => {
      console.log(error)
    })
}

const _reset = () => {
  props.compose.close()
  emit('created')
  notify('A new permission has been successfully created!')
  form.reset()
}
</script>
