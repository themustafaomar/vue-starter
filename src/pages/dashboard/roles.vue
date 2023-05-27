<template>
  <v-sheet rounded="lg" class="pa-5">
    <div class="d-flex align-center justify-space-between">
      <div>
        <h2 class="font-weight-medium text-h5">Roles</h2>
        <p class="text-medium-emphasis mb-3">
          Roles section where you can manage the user's roles.
        </p>
      </div>
      <v-btn @click="dialog.show()" color="primary" elevation="0">
        New role
        <v-icon class="ms-1">mdi-lock-outline</v-icon>
      </v-btn>
    </div>

    <v-divider />

    <v-table class="mt-5">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Guard</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles">
          <td>{{ role.name }}</td>
          <td>{{ role.guard_name }}</td>
          <td>
            <v-btn color="red" elevation="0" size="33" icon class="me-2">
              <v-icon size="15">mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn color="primary" elevation="0" size="33" icon>
              <v-icon size="15">mdi-eye</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- dialog -->
    <app-dialog ref="dialog" title="Add new role">
      <v-card-text>
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
          :disabled="form.busy"
          :loading="form.busy"
          variant="flat"
          color="primary"
        >
          Add role
        </v-btn>
      </template>
    </app-dialog>
    <!-- end dialog -->
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'
import { useValidator } from '@/composables/useValidator'
import { useLoader } from '@/composables/useLoader'
import { useForm } from '@/composables/useForm'
import { createRoleValidation } from '@/validations/roles'
import AppDialog from '@/components/app/Dialog.vue'

const dialog = ref(null)
const roles = ref([])
const loader = useLoader()
const { handleSubmit } = useValidator(createRoleValidation)
const form = useForm({
  name: '',
})

onMounted(async () => {
  roles.value = (await axios.get('/roles')).data

  loader.markAsLoaded()
})

const create = handleSubmit(() => {})
</script>
