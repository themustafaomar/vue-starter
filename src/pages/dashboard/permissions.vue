<template>
  <v-sheet rounded="lg" class="pa-5">
    <div class="d-flex align-center justify-space-between">
      <div>
        <h2 class="font-weight-medium text-h5">Permissions</h2>
        <p class="text-medium-emphasis mb-3">
          Permissions section where you can manage the user's permissions.
        </p>
      </div>
      <v-btn @click="activateDialog" color="primary" elevation="0">
        New permission
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
        <tr v-for="permission in permissions">
          <td>{{ permission.name }}</td>
          <td>{{ permission.guard_name }}</td>
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
    <app-dialog ref="dialog" title="Add new permission">
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

      <template #actions="{ close }">
        <v-btn @click="close" variant="flat" color="red">Cancel</v-btn>
        <v-btn @click="create" :disabled="form.busy" variant="flat" color="primary">
          <app-btn-loader :state="form.busy">Add permission</app-btn-loader>
        </v-btn>
      </template>
    </app-dialog>
    <!-- end dialog -->
  </v-sheet>
</template>

<script setup>
import { Form } from 'vform'
import { ref, onMounted, reactive } from 'vue'
import { useLoader } from '@/composables/loader'
import axios from '@/plugins/axios'
import AppDialog from '@/components/app/Dialog.vue'

const loader = useLoader()
const dialog = ref(null)
const permissions = ref([])
const form = reactive(
  new Form({
    name: 'A Permission Name',
  })
)

onMounted(async () => {
  const { data } = await axios.get('/permissions')

  permissions.value = data

  loader.markAsLoaded()
})

// Functions

function activateDialog() {
  dialog.value.show()
}

function create() {
  const { data } = form.post('/permissions')

  // ..
}
</script>
