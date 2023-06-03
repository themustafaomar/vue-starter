<template>
  <v-sheet class="pa-10">
    <v-btn @click="open" color="primary" elevation="0">
      New role
      <v-icon class="ms-1">mdi-lock-outline</v-icon>
    </v-btn>
    <!-- <Form :validation-schema="validation" @submit="onSubmit" v-slot="{ meta }">
      <h2>Experimental</h2>
      <p class="text-grey-darken-1 mb-8">This is an experimental feature for validating forms.</p>

      <TextField v-model="form.first_name" :form="form" name="first_name" class="mb-4" />
      <TextField v-model="form.last_name" :form="form" name="last_name" class="mb-4" />

      <v-btn
        type="submit"
        color="primary"
        :disabled="form.busy || !meta.valid"
        :loading="form.busy"
      >
        Submit
      </v-btn>
    </Form> -->
    <app-dashboard-roles-create ref="createDialog" />
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// import { Form } from 'vee-validate'
// import { useForm } from '@/composables/useForm'
// import { validation } from '@/validations/common'
// import TextField from './TextFieldWithValidation.vue'
import AppDashboardRolesCreate from '@/components/dashboard/roles/Create.vue'

const createDialog = ref(null)
/* const form = useForm({
  first_name: '',
  last_name: '',
}) */

// Functions

// const onSubmit = (values) => {
//   form.post(`/hi`)
// }

const open = () => {
  createDialog.value.open()
}
</script>
