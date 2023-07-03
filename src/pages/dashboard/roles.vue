<template>
  <v-sheet class="rounded-lg shadow-sm py-4" rounded="lg">
    <app-dashboard-heading-classic title="Roles">
      <template #actions>
        <v-btn color="primary" rounded="pill" elevation="0" @click="composeDialog.open()">
          <v-icon class="me-1">mdi-lock-outline</v-icon>
          Add role
        </v-btn>
      </template>
    </app-dashboard-heading-classic>

    <!-- <app-dashboard-heading
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
    </app-dashboard-heading> -->

    <v-data-table
      :items-per-page="15"
      :headers="headers"
      :items="roles"
      checkbox-color="primary"
      :expanded.sync="expanded"
      hover
      density="comfortable"
    >
      <template #item.id="{ item }">
        <div class="py-3">#{{ item.raw.id }}</div>
      </template>

      <template #item.actions="{ item }">
        <app-dashboard-edit-btn @click="composeDialog.open(item.raw.id)" />
        <app-dashboard-delete-btn @click.prevent />
      </template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount" />
        </div>
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
import AppDashboardHeadingClassic from '@/components/dashboard/HeadingClassic.vue'
import AppDashboardEditBtn from '@/components/dashboard/EditBtn.vue'
import AppDashboardDeleteBtn from '@/components/dashboard/DeleteBtn.vue'

const roles = ref([])
const expanded = ref([])
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

<style>
thead th {
  background-color: #f8fafc !important;
  text-transform: uppercase;
}
.v-table .v-table__wrapper > table > thead > tr > th {
  border-color: #eee !important;
}
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: 1px solid #eee;
}
</style>
