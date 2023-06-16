<template>
  <app-dashboard-heading
    title="Users"
    description="Users section is where you can manage the users list."
    class="mb-5"
  >
    <template #action>
      <v-btn @click="composeDialog.open()" color="primary" elevation="0">
        New user
        <v-icon class="ms-1">mdi-lock-outline</v-icon>
      </v-btn>
    </template>
  </app-dashboard-heading>

  <v-sheet rounded="lg" class="pa-5">
    <v-data-table :items-per-page="10" :headers="headers" :items="users">
      <template #item.id="{ item }">#{{ item.raw.id }}</template>
      <template #item.avatar="{ item }">
        <v-img :src="item.raw.avatar" width="35" class="rounded-pill">
          <template #placeholder>
            <v-skeleton-loader type="avatar" width="35" height="35" class="ma-0" />
          </template>
        </v-img>
      </template>
      <template #item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="composeDialog.open(item.raw.id)">
          mdi-pencil
        </v-icon>
        <v-icon size="small">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import axios from '@/plugins/axios'
import AppDashboardHeading from '@/components/dashboard/Heading.vue'

const users = ref([])
const composeDialog = ref(null)
const loader = useLoader()
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Avatar', key: 'avatar' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])

// Lifecycle hooks

onMounted(() => fetch())

// Functions

const fetch = async () => {
  users.value = (await axios.get('/users')).data.data
  loader.markAsLoaded()
}
</script>
