<template>
  <app-sheet title="Users" table class="pb-5">
    <template #actions>
      <v-btn @click="composer.add()" color="primary" rounded="pill">Create User</v-btn>
    </template>

    <v-sheet>
      <v-row no-gutters>
        <v-col cols="8">
          <v-text-field
            placeholder="Search term"
            rounded="0"
            clearable
            hide-details
            variant="solo"
            elevation="0"
            class="search-field"
          >
            <template #prepend-inner>
              <v-icon>mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="4" class="d-none">
          <v-btn
            height="50"
            color="white"
            rounded="0"
            text="View all"
            elevation="0"
            class="text-grey-darken-2"
          />
          <v-btn
            height="50"
            color="white"
            rounded="0"
            text="Admins"
            elevation="0"
            class="text-grey-darken-2"
          />
          <v-btn
            height="50"
            color="white"
            rounded="0"
            text="Normal users"
            elevation="0"
            class="text-grey-darken-2"
          />
        </v-col>
        <!-- <v-col cols="4">
          <v-text-field
            placeholder="Search term"
            rounded="0"
            clearable
            hide-details
            variant="solo"
            elevation="0"
            class="search-field"
          >
            <template #prepend-inner>
              <v-icon>mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-col> -->
      </v-row>
    </v-sheet>

    <v-data-table :headers="headers" :items="users" class="border-t">
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
        <v-icon
          @click="$router.push(`/dashboard/chat?conversation=${item.raw.id}`)"
          size="small"
          class="text-grey-darken-2 me-2"
        >
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="19">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </v-icon>
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
  // { title: 'ID', key: 'id' },
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

<style>
.search-field {
  .v-field.v-field--appended {
    box-shadow: none;
  }
}
</style>
