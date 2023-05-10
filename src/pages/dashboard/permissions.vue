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

    <p class="mt-4">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quod quia asperiores! Veniam
      iusto nulla assumenda nostrum temporibus id fuga recusandae. Mollitia assumenda illum sequi
      corrupti esse ad molestias veritatis.
    </p>

    <!-- dialog -->
    <app-dialog ref="createDialog" title="Add new permission">
      <v-card-text class="py-6">
        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
          label="Permission Name"
          placeholder="Enter the permission name"
          hide-details
          required
        ></app-text-field>
      </v-card-text>
      <template #actions="{ close }">
        <v-btn variant="flat" color="red" @click="close">Cancel</v-btn>
        <v-btn :disabled="form.busy" variant="flat" color="primary" @click="create">
          <app-btn-loader :state="form.busy">Create permission</app-btn-loader>
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
const createDialog = ref(null)
const form = reactive(
  new Form({
    name: '',
  })
)

onMounted(() => {
  loader.markAsLoaded()
})

function activateDialog() {
  createDialog.value.show()
}

function create() {
  const { data } = form.post('/permissions/create')

  // ..
}
</script>
