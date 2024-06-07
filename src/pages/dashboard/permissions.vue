<template>
  <app-sheet title="Permissions" table class="pb-5">
    <v-data-table :headers="headers" :items="permissions">
      <template #item.assigned_to="{ item }">
        <v-chip v-for="role in item.roles" color="primary" variant="tonal" class="mx-1">
          {{ role.name }}
        </v-chip>
      </template>

      <template #item.actions="">...</template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" />
        </div>
      </template>
    </v-data-table>
  </app-sheet>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/plugins/axios'

const permissions = ref([])
const page = ref(1)
const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Guard Name', key: 'guard_name' },
  { title: 'Assigned To', key: 'assigned_to' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])

const getPermissions = async () => {
  const { data } = await axios.get('/permissions?roles=true')
  permissions.value = data.data
}

getPermissions()
</script>
