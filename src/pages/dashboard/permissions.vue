<template>
  <v-sheet class="rounded-lg shadow-sm py-4" rounded="lg">
    <app-dashboard-heading-classic title="Permissions">
      <template #actions>
        <v-btn color="primary" rounded="pill" elevation="0" @click="composeDialog.open()">
          <v-icon class="me-1">mdi-lock-outline</v-icon>
          Add permission
        </v-btn>
      </template>
    </app-dashboard-heading-classic>

    <v-data-table :headers="headers" :items="permissions" :items-per-page="15">
      <template #item.id="{ item }">
        <div class="py-3">#{{ item.raw.id }}</div>
      </template>

      <template #item.assigned_to="{ item }">
        <v-chip v-for="role in item.raw.roles" color="primary" variant="tonal" class="mx-1">
          {{ role.name }}
        </v-chip>
      </template>

      <template #item.actions="">...</template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount" />
        </div>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import axios from '@/plugins/axios'
import AppDashboardHeadingClassic from '@/components/dashboard/HeadingClassic.vue'

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
