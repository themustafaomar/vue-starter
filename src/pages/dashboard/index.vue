<template>
  <app-dashboard-heading
    title="Dashboard"
    description="Welcome to dashboard, it's nice to see you again!"
  />

  <!-- grid system -->
  <v-row v-for="n in 1" :key="n" class="mt-2">
    <v-col v-for="n in 3" cols="4" :key="n">
      <v-sheet class="pa-5" rounded="lg">
        <h3 class="font-weight-regular text-h6 mb-2">Grid system box {{ n }}</h3>
        <p class="text-medium-emphasis">
          Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
          veniam vero sapiente, aperiam at!
        </p>
      </v-sheet>
    </v-col>
  </v-row>

  <v-row class="mb-5">
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
        <v-btn @click="showToast" color="primary" elevation="0" rounded="pill" class="mt-4">
          Show toast
          <v-icon class="ms-1">mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn @click="showErrorToast" color="red" elevation="0" rounded="pill" class="ms-3 mt-4">
          Show toast error
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
        <v-btn @click="dialog.show(10)" color="primary" elevation="0" rounded="pill" class="mt-4">
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
        <v-btn @click.prevent="makeError" color="red" elevation="0" rounded="pill" class="mt-4">
          Simulate error
          <v-icon class="ms-1">mdi-delete-outline</v-icon>
        </v-btn>
      </v-sheet>
    </v-col>

    <!-- text fields -->
    <v-col cols="3">
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

        <v-btn @click="sendRequest" size="large" block color="primary" elevation="0">
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

    <!-- text fields -->
    <v-col cols="3">
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
          label="Your Name"
          placeholder="Name"
          required
          class="mb-4"
        ></app-text-field>

        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
          label="Your Email"
          placeholder="Email"
          class="mb-4"
        ></app-text-field>

        <app-text-field
          v-model="form.password"
          :form="form"
          name="password"
          type="password"
          label="Your Password"
          placeholder="Password"
          required
          class="mb-4"
        ></app-text-field>

        <app-select
          :form="form"
          name="account_type"
          label="Account Type"
          :items="['Individual', 'Company', 'For My Child']"
          placeholder="Password"
          required
          class="mb-5"
        ></app-select>

        <v-btn
          @click="sendRequest"
          :disabled="form.busy"
          size="large"
          block
          color="primary"
          elevation="0"
        >
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
    message="Are you sure you want to delete this item? this item will be deleted immediately. you cannot undo this action."
  >
    <template #actions="{ close, payload }">
      <v-btn variant="flat" color="red" @click="close">Cancel</v-btn>
      <v-btn variant="flat" color="primary" @click="deleteItem(payload)">I understand</v-btn>
    </template>
  </app-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Form } from 'vform'
import AppDialog from '@/components/common/Dialog.vue'
import AppDashboardHeading from '@/components/dashboard/Heading.vue'
import axios from '@/plugins/axios'

const store = useStore()
const dialog = ref(null)
const form = reactive(
  new Form({
    name: '',
    email: '',
    account_type: '',
  })
)

onMounted(() => {
  axios.get(`/user`).then((response) => {
    console.log(response)
  })
})

function showToast() {
  store.commit('app/notify', 'This is a message for primary toast!')
}

function showErrorToast() {
  store.commit('app/notify', {
    message: 'This is a message for error toast.',
    color: 'red',
  })
}

function makeError() {
  store.commit('app/error', {
    message: 'Page not found',
    type: 404,
  })
}

function deleteItem(id) {
  console.log(id)
  dialog.value.hide()
}

function sendRequest() {
  // prettier-ignore
  form.post('/test')
    .then(() => {})
    .catch((error) => {
      store.commit('app/notify', {
        message: error.response.data.message,
        color: 'red',
      })
    })
}
</script>
