<template>
  <v-sheet rounded="lg" class="pa-5">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h2 class="font-weight-medium text-h5">Permissions</h2>
        <p class="text-medium-emphasis mb-3" style="max-width: 900px">
          Permissions are a means of controlling and regulating access to specific system- and
          device-level functions by software.
        </p>
      </div>
      <v-btn @click="dialog.show()" color="primary" elevation="0">
        New permission
        <v-icon class="ms-1">mdi-lock-outline</v-icon>
      </v-btn>
    </div>

    <v-data-table :headers="headers" :items="permissions" :items-per-page="10" item-value="name">
      <template #item.assigned_to="{ item }">
        <v-chip v-for="role in item.raw.roles" color="primary" variant="tonal" class="mx-1">
          {{ role.name }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-icon size="small" class="me-2">mdi-pencil</v-icon>
        <v-icon size="small">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import axios from '@/plugins/axios'

const dialog = ref(null)
const permissions = ref([])
const loader = useLoader()
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Guard Name', key: 'guard_name' },
  { title: 'Assigned To', key: 'assigned_to' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])

onMounted(async () => {
  permissions.value = (await axios.get('/permissions?roles=true')).data.data

  loader.markAsLoaded()
})
</script>
