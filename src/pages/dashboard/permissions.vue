<template>
  <v-sheet rounded="lg" class="pa-5">
    <div class="d-flex align-center justify-space-between">
      <div>
        <h2 class="font-weight-medium text-h5">Permissions</h2>
        <p class="text-medium-emphasis mb-3">
          Permissions section where you can manage the user's permissions.
        </p>
      </div>
      <v-btn @click="activateDialog" color="primary" elevation="0">
        New permission
        <v-icon class="ms-1">mdi-lock-outline</v-icon>
      </v-btn>
    </div>

    <v-divider />

    <v-table class="mt-5">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mustafa Omar</td>
          <td>25</td>
          <td>
            <v-btn id="menu-activator" color="white" elevation="0" size="small" icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-btn>

            <v-menu activator="#menu-activator">
              <v-list>
                <v-list-item
                  v-for="(item, index) in [{ title: 'Edit' }, { title: 'Delete' }]"
                  :key="index"
                  :value="index"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- dialog -->
    <app-dialog ref="dialog" title="Add new permission">
      <v-card-text>
        <app-text-field
          v-model="form.name"
          :form="form"
          name="name"
          label="Permission Name"
          placeholder="Enter the permission name"
          hide-details
          required
        ></app-text-field>
      </v-card-text>

      <template #actions="{ close }">
        <v-btn @click="close" variant="flat" color="red">Cancel</v-btn>
        <v-btn @click="create" :disabled="form.busy" variant="flat" color="primary">
          <app-btn-loader :state="form.busy">Add permission</app-btn-loader>
        </v-btn>
      </template>
    </app-dialog>
    <!-- end dialog -->
  </v-sheet>
</template>

<script setup>
import { Form } from 'vform'
import { ref, onMounted, reactive } from 'vue'
import { useLoader } from '@/composables/loader'
import AppDialog from '@/components/app/Dialog.vue'

const loader = useLoader()
const dialog = ref(null)
const form = reactive(
  new Form({
    name: 'A Permission Name',
  })
)

onMounted(() => {
  loader.markAsLoaded()
})

function activateDialog() {
  dialog.value.show()
}

function create() {
  const { data } = form.post('/permissions')

  // ..
}
</script>
