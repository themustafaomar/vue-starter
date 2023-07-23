<template>
  <app-sheet title="Permissions" table class="pb-5">
    <template #actions>
      <v-btn @click="composer.add()" color="primary" rounded="pill">Create Permission</v-btn>
    </template>

    <v-data-table :headers="headers" :items="permissions">
      <template #item.assigned_to="{ item }">
        <v-chip v-for="role in item.raw.roles" color="primary" variant="tonal" class="mx-1">
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

  <useComposer ref="composer" title="Permission" v-slot="{ props }">
    <!-- @deprecated -->
    <app-dashboard-permissions-create v-bind="props" @created="fetch()" />
  </useComposer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import axios from '@/plugins/axios'
import useComposer from '@/hoc/useComposer.vue'
import AppDashboardPermissionsCreate from '@/components/dashboard/permissions/Create.vue'

const composer = ref(null)
const permissions = ref([])
const page = ref(1)
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
