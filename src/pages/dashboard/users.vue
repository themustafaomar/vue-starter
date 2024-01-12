<template>
  <app-sheet title="Users" table borderless class="pb-5">
    <template #actions>
      <v-btn @click="composer.add()" color="primary" rounded="pill" class="shadow-md">
        Create User
      </v-btn>
    </template>

    <template #toolbar>
      <div>
        <v-btn id="menu-activator" elevation="0" class="shadow-sm me-2">
          {{
            selectedAction.length
              ? actions.find((action) => action.value === selectedAction[0]).title
              : 'Bulk Action'
          }}
          <v-icon icon="mdi-chevron-down" class="ms-1"></v-icon>
        </v-btn>

        <v-menu activator="#menu-activator">
          <v-list
            v-model:selected="selectedAction"
            :items="actions"
            rounded="lg"
            class="shadow-xl"
          ></v-list>
        </v-menu>

        <v-btn
          text="Apply"
          elevation="0"
          color="primary"
          class="shadow-sm me-2"
          :disabled="!selectedUsers.length || !selectedAction.length"
          :loading="isLoading"
          @click="apply"
        />
      </div>

      <v-text-field
        placeholder="Search term"
        rounded="md"
        clearable
        hide-details
        variant="solo"
        elevation="0"
        class="search-field shadow-sm"
        style="max-width: 400px"
      >
        <template #prepend-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </template>

    <v-data-table v-model="selectedUsers" :headers="headers" :items="users" :loading="isLoading">
      <template #item.id="{ item }">
        <div class="py-3">#{{ item.id }}</div>
      </template>

      <template #item.name="{ item }">
        <v-avatar :image="item.avatar" size="32" class="rounded-pill" />
        <span class="d-inline-block ms-3">{{ item.name }}</span>
      </template>

      <template #item.role="{ item }">
        <v-chip color="primary">{{ item.role.name }}</v-chip>
      </template>

      <template #item.status="{ item }">
        <v-icon small size="17" :color="item.status.color">mdi-check-circle</v-icon>
        <span class="text-capitalize ms-1">{{ item.status.name }}</span>
      </template>

      <template #item.actions="{ item }">
        <v-icon
          @click="$router.push(`/dashboard/chat?conversation=${item.id}`)"
          size="small"
          class="text-grey-darken-2 me-2"
        >
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="19">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </v-icon>
        <edit-btn v-if="can('update users')" @click="composer.update(item)" />
        <delete-btn v-if="can('delete users')" @click="" />
      </template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" />
        </div>
      </template>
    </v-data-table>
  </app-sheet>

  <useComposer ref="composer" title="User" v-slot="{ props }">
    <users-compose v-bind="props" @created="fetch()" />
  </useComposer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import axios from '@/plugins/axios'
import useComposer from '@/hoc/useComposer.vue'
import UsersCompose from '@/components/dashboard/users/Compose.vue'
import EditBtn from '@/components/dashboard/EditBtn.vue'
import DeleteBtn from '@/components/dashboard/DeleteBtn.vue'

const composer = ref(null)
const users = ref([])
const page = ref(1)
const isLoading = ref(false)
const actions = ref([
  { title: 'Bulk Action', value: null, props: { disabled: true } },
  { title: 'Send Email', value: 'sendmail' },
  { title: 'Suspend', value: 'suspend' },
  { title: 'Delete', value: 'delete' },
])
const selectedAction = ref([])
const selectedUsers = ref([])
const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone Number', key: 'phone_number' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])
const loader = useLoader()

// Lifecycle Hooks

onMounted(() => fetch())

// Functions

const fetch = async () => {
  users.value = (await axios.get('/users')).data.data

  loader.markAsLoaded()
}

const apply = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    selectedAction.value = []
    selectedUsers.value = []
  }, 1500)
}
</script>

<style lang="scss">
.search-field {
  .v-field.v-field--appended {
    box-shadow: none;
  }
  .v-field__input {
    min-height: 36px !important;
    height: 36px;
    padding: {
      top: 0;
      bottom: 0;
    }
  }
}
</style>
