<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto border rounded-lg pa-8">
      <v-progress-linear :active="isLoading" color="primary" indeterminate absolute bottom />

      <app-auth-heading
        title="Sign in"
        description="Enter a new password to reset the password on your account, we'll ask for this password whenever you login"
      />

      <v-form @submit.prevent="submit">
        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
          label="Email"
          placeholder="Your Email"
          persistent-placeholder
          hint="Your email you used to login with"
          persistent-hint
          required
          class="mb-5"
        ></app-text-field>

        <app-text-field
          v-model="form.password"
          type="password"
          :form="form"
          name="password"
          label="Password"
          placeholder="Your Password"
          persistent-placeholder
          hint="Pick a powerful password"
          persistent-hint
          required
          class="mb-5"
        ></app-text-field>

        <app-text-field
          v-model="form.password_confirmation"
          type="password"
          :form="form"
          name="password_confirmation"
          label="Confirm Password"
          placeholder="Your Password Again"
          persistent-placeholder
          hint="Confirm your password"
          persistent-hint
          required
          class="mb-5"
        ></app-text-field>

        <v-btn
          :disabled="isLoading || !isValid"
          :loading="isLoading"
          type="submit"
          color="primary"
          block
          elevation="0"
          class="py-5"
        >
          Reset Password
        </v-btn>

        <p class="text-center text-grey mt-5">
          Know your password?
          <router-link to="/login" class="text-decoration-none text-primary">sign in</router-link>
        </p>
      </v-form>
    </v-sheet>
  </AuthLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useForm } from '@/composables/useForm'
import { useValidator } from '@/composables/useValidator'
import { resetPasswordValidation } from '@/validations/auth'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

const route = useRoute()
const router = useRouter()
const { notify } = useAppStore()
const authStore = useAuthStore()
const { handleSubmit, isValid } = useValidator(resetPasswordValidation)
const isLoading = computed(() => authStore.isLoading)
const form = useForm({
  email: route.query.email,
  token: route.params.token,
  password: '',
  password_confirmation: '',
})

// Lifecycle hooks

onMounted(() => {
  if (!route.params.token || !route.query.email) {
    router.push('/404')
  }
})

// Functions

const submit = handleSubmit(async () => {
  authStore.loading()
  form
    .post(`${import.meta.env.VITE_SERVER_URL}/reset-password`)
    .then(({ data }) => {
      router.push('/login').then(() => {
        authStore.loaded()
        notify({ message: data.status, color: 'primary' })
      })
    })
    .catch((error) => {
      authStore.loaded()
      notify({
        message: error.response.data.message,
        color: 'red',
      })
    })
})
</script>
