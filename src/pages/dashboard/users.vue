<template>
  <v-sheet class="rounded-lg shadow-sm py-4" rounded="lg">
    <app-dashboard-heading-classic title="Users">
      <template #actions>
        <v-btn color="primary" rounded="pill" elevation="0" @click="compose.add()">Add user</v-btn>
      </template>
    </app-dashboard-heading-classic>

    <v-data-table :headers="headers" :items="users" :expanded="expanded" show-expand>
      <template #item.id="{ item }">
        <div class="py-3">#{{ item.raw.id }}</div>
      </template>

      <template #item.name="{ item }">
        <v-avatar :image="item.raw.avatar" size="32" class="rounded-pill" />
        <span class="d-inline-block ms-3">{{ item.raw.name }}</span>
      </template>

      <template #item.actions="{ item }">
        <app-dashboard-edit-btn v-if="can('update users')" @click="compose.update(item.raw)" />
        <app-dashboard-delete-btn v-if="can('delete users')" @click.prevent />
      </template>

      <template #item.role="{ item }">
        <v-chip color="dark">{{ item.raw.role.name }}</v-chip>
      </template>

      <template #item.status="{ item }">
        <v-icon small size="17" :color="item.raw.status.color">mdi-check-circle</v-icon>
        {{ item.raw.status.name }}
      </template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" />
        </div>
      </template>
    </v-data-table>

    <app-dashboard-users-compose
      v-model="compose.isActive.value"
      :data="compose.data"
      @created="compose.markAsCreated(() => fetch())"
    ></app-dashboard-users-compose>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import { useComposer } from '@/composables/useComposer'
import axios from '@/plugins/axios'
import AppDashboardHeadingClassic from '@/components/dashboard/HeadingClassic.vue'
import AppDashboardUsersCompose from '@/components/dashboard/users/Compose.vue'
import AppDashboardEditBtn from '@/components/dashboard/EditBtn.vue'
import AppDashboardDeleteBtn from '@/components/dashboard/DeleteBtn.vue'

const users = ref([])
const expanded = ref([])
const page = ref(1)
const loader = useLoader()
const compose = useComposer()
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])

// Hooks

onMounted(() => {
  fetch()
})

// Functions

const fetch = async () => {
  users.value = (await axios.get('/users')).data.data
  loader.markAsLoaded()
}
</script>
