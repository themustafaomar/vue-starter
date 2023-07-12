<template>
  <app-sheet title="Permissions" table class="pb-5">
    <v-data-table :headers="headers" :items="permissions">
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
  </app-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import axios from '@/plugins/axios'

const permissions = ref([])
const loader = useLoader()
const headers = ref([
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
