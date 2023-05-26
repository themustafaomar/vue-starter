<template>
  <app-dashboard-heading
    title="Components"
    description="Welcome to the components section, here are some set of common components for your next app."
  />

  <v-row class="mb-5 mt-2">
    <v-col cols="12">
      <v-sheet class="pa-5" rounded="lg">
        <v-row>
          <v-col cols="6">
            <app-uploader label="Upload your profile picture" />
          </v-col>
          <v-col cols="6">
            <app-uploader
              label="Upload your profile picture (update example)"
              is-updating
              preview-url="/logo-shape.avif"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>

    <!-- toasts (snackbars) -->
    <v-col cols="4">
      <v-sheet class="pa-5" rounded="lg">
        <h3 class="font-weight-regular text-h6 mb-2">
          This is to test
          <code>toasts</code>
        </h3>
        <p class="text-medium-emphasis">
          Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
          veniam vero sapiente, aperiam at!
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
      <v-sheet class="pa-5" rounded="lg">
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
      </v-sheet>
    </v-col>

    <!-- error page simulation -->
    <v-col cols="4">
      <v-sheet class="pa-5" rounded="lg">
        <h3 class="font-weight-regular text-h6 mb-2">
          This is to test
          <code>error</code>
          page
        </h3>
        <p class="text-medium-emphasis">
          Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
          veniam vero sapiente, aperiam at!
        </p>
        <v-btn color="red" elevation="0" rounded="pill" class="mt-4" @click.prevent="makeError">
          Simulate error
          <v-icon class="ms-1">mdi-delete-outline</v-icon>
        </v-btn>
      </v-sheet>
    </v-col>

    <!-- text fields -->
    <v-col cols="4" xl="3">
      <v-sheet class="pa-5" rounded="lg">
        <h3 class="font-weight-regular text-h6 mb-2">
          This is to test
          <code>text fields</code>
        </h3>
        <p class="text-medium-emphasis mb-6">This is an example of using the custom text fields.</p>

        <app-text-field
          v-model="form.name"
          :form="form"
          name="name"
          label="Name"
          placeholder="Your Name"
          persistent-placeholder
          required
          class="mb-4"
        ></app-text-field>

        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
          label="Email"
          placeholder="Your Email"
          persistent-placeholder
          class="mb-4"
        ></app-text-field>

        <app-text-field
          v-model="form.password"
          :form="form"
          name="password"
          type="password"
          label="Password"
          placeholder="Your Password"
          persistent-placeholder
          required
          class="mb-4"
        ></app-text-field>

        <app-select
          v-model="form.account_type"
          :form="form"
          name="account_type"
          label="Account Type"
          :items="['Individual', 'Company', 'For My Child']"
          persistent-hint
          hint="Choose the account type"
          class="mb-5"
        ></app-select>

        <v-btn size="large" block color="primary" elevation="0" @click="sendRequest">
          <v-progress-circular
            v-if="form.busy"
            color="white"
            bg-color="transparent"
            indeterminate
            size="27"
            width="2"
          ></v-progress-circular>
          <template v-else>Send</template>
        </v-btn>
      </v-sheet>
    </v-col>
  </v-row>

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
import { useStore } from 'vuex'
import { useForm } from '@/composables/useForm'
import { useLoader } from '@/composables/useLoader'
import AppDialog from '@/components/app/Dialog.vue'
import AppDashboardHeading from '@/components/dashboard/Heading.vue'

const { commit } = useStore()
const dialog = ref(null)
const form = useForm({
  name: '',
  email: '',
  account_type: '',
})

const loader = useLoader()

onMounted(() => {
  setTimeout(() => loader.markAsLoaded(), 1000)
})

// Functions

function showToast() {
  commit('notify', 'This is a message for primary toast!')
}

function showErrorToast() {
  commit('notify', {
    message: 'This is a message for error toast.',
    color: 'red',
  })
}

function makeError() {
  commit('error', {
    message: 'Page Not Found',
    type: 404,
  })
}

function deleteItem(id) {
  console.log(id)
  dialog.value.hide()
}

function sendRequest() {
  form.post('/test').then(() => {})
}
</script>
