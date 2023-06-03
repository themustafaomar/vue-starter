<template>
  <v-sheet rounded="lg" class="pa-5">
    <div class="d-flex align-center justify-space-between">
      <div>
        <h2 class="font-weight-medium text-h5">Roles</h2>
        <p class="text-medium-emphasis mb-3">
          Roles section where you can manage the user's roles.
        </p>
      </div>
      <v-btn @click="open" color="primary" elevation="0">
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
  </v-sheet>
  <app-dashboard-roles-create ref="createDialog" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'
import { useLoader } from '@/composables/useLoader'
import AppDashboardRolesCreate from '@/components/dashboard/roles/Create.vue'

const roles = ref([])
const createDialog = ref(null)
const loader = useLoader()

onMounted(async () => {
  roles.value = (await axios.get('/roles')).data

  loader.markAsLoaded()
})

// Functions

const open = () => createDialog.value.open()
</script>
