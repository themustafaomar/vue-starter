<template>
  <!-- profile info form -->
  <app-sheet title="Profile">
    <v-row class="mt-2">
      <v-col cols="4" class="mx-auto text-center mb-5">
        <profile-avatar @save="saveAvatar" :user="user" />
        <h4 class="mt-1">Profile Picture</h4>
        <p class="text-grey">Change your profile picture.</p>
      </v-col>

      <v-col cols="12" class="py-0"></v-col>

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
  </app-sheet>
  <!-- end profile info form -->

  <!-- password form -->
  <app-sheet title="Update Password" class="mt-5">
    <v-row class="mt-2">
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
  </app-sheet>
  <!-- end password form -->
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useForm } from '@/composables/useForm'
import { useUser } from '@/composables/useUser'
import { useLoader } from '@/composables/useLoader'
import storage from '@/plugins/storage'
import ProfileAvatar from '@/components/dashboard/profile/Avatar.vue'

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

// Profile picture form
const profilePicture = useForm({
  avatar: null,
  coords: '',
})

onMounted(() => {
  form.update(user)
  loader.markAsLoaded()
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

async function saveAvatar({ avatar, coords, url }) {
  const { width, height, x, y } = coords

  profilePicture.update({
    avatar: avatar,
    coords: `${width},${height},${x},${y}`,
  })

  const { data } = await profilePicture.post('/profile/avatar')

  notify('Your profile picture has been successfully changed!')

  user.avatar_url = url

  const currentUser = JSON.parse(storage.get('user'))

  currentUser.avatar_url = data.avatar
  storage.set('user', JSON.stringify(currentUser))
}
</script>
