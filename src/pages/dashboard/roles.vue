<template>
  <v-sheet rounded="lg" class="pa-5">
    <app-dashboard-heading
      title="Roles"
      description="Roles secti
      on where you can manage the user's roles."
    >
      <template #action>
        <v-btn @click="composeDialog.open()" color="primary" elevation="0">
          New role
          <v-icon class="ms-1">mdi-lock-outline</v-icon>
        </v-btn>
      </template>
    </app-dashboard-heading>

    <v-data-table :items-per-page="10" :headers="headers" :items="roles" item-value="name">
      <template #item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="composeDialog.open(item.raw.id)">
          mdi-pencil
        </v-icon>
        <v-icon size="small">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <app-dashboard-roles-compose @role:created="roleCreated" ref="composeDialog" />
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'
import { useLoader } from '@/composables/useLoader'
import AppDashboardRolesCompose from '@/components/dashboard/roles/Compose.vue'
import AppDashboardHeading from '@/components/dashboard/Heading.vue'

const roles = ref([])
const composeDialog = ref(null)
const loader = useLoader()
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Guard Name', key: 'guard_name' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])

// Lifecycle hooks

onMounted(() => fetchRoles())

// Functions

const fetchRoles = async () => {
  roles.value = (await axios.get('/roles')).data.data
  loader.markAsLoaded()
}

const roleCreated = () => {
  loader.markAsLoading()
  fetchRoles()
}
</script>
