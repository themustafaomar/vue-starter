<template>
  <app-sheet title="Users" table class="pb-5">
    <v-data-table :headers="headers" :items="users">
      <template #item.id="{ item }">
        <div class="py-3">#{{ item.raw.id }}</div>
      </template>

      <template #item.name="{ item }">
        <v-avatar :image="item.raw.avatar" size="32" class="rounded-pill" />
        <span class="d-inline-block ms-3">{{ item.raw.name }}</span>
      </template>

      <template #item.role="{ item }">
        <v-chip color="primary">{{ item.raw.role.name }}</v-chip>
      </template>

      <template #item.status="{ item }">
        <v-icon small size="17" :color="item.raw.status.color">mdi-check-circle</v-icon>
        <span class="text-capitalize ms-1">{{ item.raw.status.name }}</span>
      </template>

      <template #item.actions="{ item }">
        <app-dashboard-edit-btn v-if="can('update users')" @click="composer.update(item.raw)" />
        <app-dashboard-delete-btn v-if="can('delete users')" @click.prevent />
      </template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" />
        </div>
      </template>
    </v-data-table>
  </app-sheet>

  <useComposer ref="composer" title="User" v-slot="{ props }">
    <app-dashboard-users-compose v-bind="props" @created="fetch()" />
  </useComposer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import axios from '@/plugins/axios'
import useComposer from '@/hoc/useComposer.vue'
import AppDashboardUsersCompose from '@/components/dashboard/users/Compose.vue'
import AppDashboardEditBtn from '@/components/dashboard/EditBtn.vue'
import AppDashboardDeleteBtn from '@/components/dashboard/DeleteBtn.vue'

const composer = ref(null)
const users = ref([])
const page = ref(1)
const loader = useLoader()
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])

// Lifecycle Hooks

onMounted(() => fetch())

// Functions

const fetch = async () => {
  users.value = (await axios.get('/users')).data.data

  loader.markAsLoaded()
}
</script>
