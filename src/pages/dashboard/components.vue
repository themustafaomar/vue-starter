<template>
  <app-sheet title="Components">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="6">
            <app-uploader
              v-model="form.file"
              required
              label="Upload your profile picture"
              extensions="jpg,svg,jpeg,png,bmp,gif,webp,avif"
            />
            <div v-if="form.file" class="mt-3">
              {{ `${form.file.name} - ${Math.round(form.file.size / 1024)}KB` }}
            </div>
          </v-col>
          <v-col cols="6">
            <app-uploader
              label="Upload your profile picture (update example)"
              is-updating
              preview-url="/logo.png"
            />
          </v-col>
          <v-col cols="6">
            <app-uploader
              v-model="form.files"
              required
              label="Upload your profile pictures (multiple example)"
              multiple
              :max="10"
              extensions="jpg,svg,jpeg,png,bmp,gif,webp"
            ></app-uploader>
            <pre v-if="Array.from(form.files).length" class="mt-3">{{
              Array.from(form.files || []).map(
                (file) => `${file.name} - ${Math.round(file.size / 1024)}KB`
              )
            }}</pre>
          </v-col>
          <v-col cols="6">
            <app-uploader
              v-model="form.files"
              required
              label="Upload your profile pictures (multiple example)"
              accept="image/*"
              multiple
            ></app-uploader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </app-sheet>

  <app-sheet class="mt-6">
    <template #header>
      <h3 class="font-weight-medium">Other Components</h3>
    </template>

    <v-row>
      <!-- toasts (snackbars) -->
      <v-col cols="4">
        <v-sheet rounded="lg">
          <h3 class="font-weight-regular text-h6 mb-2">
            This is to test
            <code>toasts</code>
          </h3>
          <p class="text-medium-emphasis">
            Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
          </p>
          <v-btn color="primary" elevation="0" rounded="pill" class="mt-4" @click="showToast">
            Show toast
            <v-icon class="ms-1">mdi-bell-outline</v-icon>
          </v-btn>
          <v-btn color="red" elevation="0" rounded="pill" class="ms-3 mt-4" @click="showErrorToast">
            Show error
            <v-icon class="ms-1">mdi-bell-outline</v-icon>
          </v-btn>
        </v-sheet>
      </v-col>

      <!-- delete dialogs -->
      <v-col cols="4">
        <h3 class="font-weight-regular text-h6 mb-2">
          This is to test
          <code>dialogs</code>
        </h3>
        <p class="text-medium-emphasis">
          Are you sure you want to delete this item? this item will be deleted immediately. you
          cannot undo this action.
        </p>
        <v-btn color="primary" elevation="0" rounded="pill" class="mt-4" @click="dialog.show(10)">
          Show delete dialog
          <v-icon class="ms-1">mdi-delete-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </app-sheet>

  <app-dialog
    ref="dialog"
    title="Are you sure you want to delete this item?"
    content="Are you sure you want to delete this item? this item will be deleted immediately. you cannot undo this action."
  >
    <template #actions="{ close, payload }">
      <v-btn variant="flat" color="red" @click="close">Cancel</v-btn>
      <v-btn variant="flat" color="primary" @click="deleteItem(payload)">I understand</v-btn>
    </template>
  </app-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useForm } from '@/composables/useForm'
import { useLoader } from '@/composables/useLoader'
import AppDialog from '@/components/app/Dialog.vue'

const dialog = ref(null)
const { notify } = useAppStore()
const loader = useLoader()
const form = useForm({
  name: '',
  email: '',
  account_type: '',
  file: '',
  files: [],
})

onMounted(() => {
  setTimeout(() => loader.markAsLoaded(), 1000)
})

// Functions

const showToast = () => {
  notify('This is a message for primary toast!')
}

const showErrorToast = () => {
  notify({
    message: 'This is a message for error toast.',
    color: 'red',
  })
}

function deleteItem(id) {
  console.log(id)
  dialog.value.hide()
}
</script>
