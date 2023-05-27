<template>
  <v-sheet rounded="lg" class="pa-5">
    <h2 class="font-weight-medium text-h5">Profile Information</h2>
    <p class="text-medium-emphasis mb-3">
      Profile section where you can change your account information or change your password.
    </p>

    <v-divider />

    <!-- profile info form -->
    <v-row class="mt-5">
      <v-col cols="12" sm="12" lg="6" class="pb-0">
        <app-text-field
          v-model="form.name"
          :form="form"
          name="name"
          label="Name"
          placeholder="Your Name"
          required
        ></app-text-field>
      </v-col>

      <v-col cols="12" sm="12" lg="6" class="pb-0">
        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
          label="Email"
          placeholder="Your Email"
          required
        ></app-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn
          @click="updateProfile"
          type="submit"
          :disabled="form.busy"
          elevation="0"
          color="primary"
          :loading="form.busy"
        >
          Save changes
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
  <!-- end profile info form -->

  <!-- password form -->
  <v-sheet rounded="lg" class="mt-5 pa-5">
    <h2 class="font-weight-medium text-h5">Update Password</h2>
    <p class="text-medium-emphasis mb-3">
      Update password section where you can change your password, for security pick a powerful
      password.
    </p>

    <v-divider />

    <v-row class="mt-5">
      <v-col cols="12" sm="12" lg="6" class="pb-0">
        <app-text-field
          v-model="passwordForm.password"
          type="password"
          :form="passwordForm"
          name="password"
          label="Password"
          placeholder="Your Password"
          required
        ></app-text-field>
      </v-col>

      <v-col cols="12" sm="12" lg="6" class="pb-0">
        <app-text-field
          v-model="passwordForm.password_confirmation"
          type="password"
          :form="passwordForm"
          name="password_confirmation"
          label="Confirm Password"
          placeholder="Your Password again"
          required
        ></app-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn
          @click="updatePoassword"
          type="submit"
          :disabled="passwordForm.busy"
          elevation="0"
          color="primary"
          :loading="passwordForm.busy"
        >
          Update password
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
  <!-- end password form -->
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useForm } from '@/composables/useForm'
import { useUser } from '@/composables/useUser'
import { useLoader } from '@/composables/useLoader'
import storage from '@/plugins/storage'

const user = useUser()
const loader = useLoader()
const { notify } = useAppStore()

// The profile info form
const form = useForm({
  name: '',
  email: '',
})

// The password form
const passwordForm = useForm({
  password: '',
  password_confirmation: '',
})

onMounted(() => {
  form.update(user)
  setTimeout(() => loader.markAsLoaded(), 250)
})

// Functions

async function updateProfile() {
  await form.post('/profile')

  const currentUser = JSON.parse(storage.get('user'))

  storage.set('user', JSON.stringify(Object.assign(currentUser, form.data())))

  notify('Your profile has been successfully updated!')
}

async function updatePoassword() {
  await passwordForm.post('/profile/update-password')

  notify('Your password has been successfully reset!')
}
</script>