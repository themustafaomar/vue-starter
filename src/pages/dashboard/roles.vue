<template>
  <app-sheet title="Roles" table class="pb-5">
    <template #actions>
      <v-btn color="primary" rounded="pill" elevation="0" @click="composeRole.create()">
        Add role
        <v-icon class="ms-1">mdi-cog-outline</v-icon>
      </v-btn>
    </template>

    <v-data-table :headers="headers" :items="roles">
      <template #item.id="{ item }">#{{ item.id }}</template>

      <template #item.actions="{ item }">
        <edit-btn @click="composeRole.edit(item)" />
        <delete-btn @click.prevent />
      </template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" />
        </div>
      </template>
    </v-data-table>
  </app-sheet>

  <roles-compose ref="composeRole" @created="fetchRoles()" />
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/plugins/axios'
import RolesCompose from '@/components/dashboard/roles/Compose.vue'
import EditBtn from '@/components/dashboard/EditBtn.vue'
import DeleteBtn from '@/components/dashboard/DeleteBtn.vue'

const page = ref(1)
const composeRole = ref()
const roles = ref([])
const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Guard Name', key: 'guard_name' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions' },
])

const fetchRoles = async () => {
  const { data } = await axios.get('/roles?permissions=true')
  roles.value = data.data
}

fetchRoles()
</script>
