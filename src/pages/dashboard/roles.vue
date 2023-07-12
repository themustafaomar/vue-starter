<template>
  <app-sheet title="Roles" table class="pb-5">
    <template #actions>
      <v-btn color="primary" rounded="pill" elevation="0" @click="composer.add()">
        Add role
        <v-icon class="ms-1">mdi-cog-outline</v-icon>
      </v-btn>
    </template>

    <v-data-table :headers="headers" :items="roles" hover>
      <template #item.id="{ item }">#{{ item.raw.id }}</template>

      <template #item.actions="{ item }">
        <app-dashboard-edit-btn @click="composer.update(item.raw)" />
        <app-dashboard-delete-btn @click.prevent />
      </template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" />
        </div>
      </template>
    </v-data-table>
  </app-sheet>

  <useComposer ref="composer" title="Role" v-slot="{ props }">
    <app-dashboard-roles-compose v-bind="props" @created="fetch()" />
  </useComposer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'
import { useLoader } from '@/composables/useLoader'
import useComposer from '@/hoc/useComposer.vue'
import AppDashboardRolesCompose from '@/components/dashboard/roles/Compose.vue'
import AppDashboardEditBtn from '@/components/dashboard/EditBtn.vue'
import AppDashboardDeleteBtn from '@/components/dashboard/DeleteBtn.vue'

const page = ref(1)
const composer = ref(null)
const roles = ref([])
const loader = useLoader()
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Guard Name', key: 'guard_name' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])

// Lifecycle hooks

onMounted(() => fetch())

// Functions

const fetch = async () => {
  roles.value = (await axios.get('/roles')).data.data
  loader.markAsLoaded()
}
</script>

<style>
/* thead th {
  background-color: #f8fafc !important;
  text-transform: uppercase;
}
.v-table .v-table__wrapper > table > thead > tr > th {
  border-color: #eee !important;
}
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: 1px solid #eee;
} */
</style>
