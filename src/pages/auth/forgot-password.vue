<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto pa-8 rounded-lg">
      <v-progress-linear :active="isLoading" indeterminate absolute bottom color="primary" />

      <v-alert
        v-if="showMessage"
        color="primary"
        density="comfortable"
        theme="dark"
        variant="tonal"
        prominent
        class="mb-6"
      >
        <!-- Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. -->
        <template #text>
          <h3>We have emailed your password reset link.</h3>
          <small>
            Please click on the link that just been sent to your email account to verify your email
            and continue the reset process.
          </small>
        </template>
      </v-alert>

      <app-auth-heading
        title="Sign in"
        description="Let us know your email address and we will email you a password reset that will allow you to choose a new one."
      />

      <Form
        v-slot="{ meta }"
        :validation-schema="forgotPasswordValidation"
        as="form"
        @submit="submit"
      >
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

        <v-btn
          type="submit"
          :disabled="isLoading || !meta.valid"
          :loading="isLoading"
          color="primary"
          block
          elevation="0"
          class="py-5"
        >
          Send verification code
        </v-btn>

        <p class="text-center text-grey mt-5">
          Already have an account?
          <router-link to="/login" class="text-decoration-none text-primary">sign in</router-link>
        </p>
      </Form>
    </v-sheet>
  </AuthLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Form } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useForm } from '@/composables/useForm'
import { forgotPasswordValidation } from '@/validations/auth'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

const showMessage = ref(false)
const authStore = useAuthStore()
const isLoading = computed(() => authStore.isLoading)
const form = useForm({
  email: 'themustafaomar@gmail.com',
})

// Functions

const submit = async () => {
  authStore.loading()
  try {
    await form.post(`${import.meta.env.VITE_SERVER_URL}/forgot-password`)
    showSuccessMessage()
  } catch (error) {
    authStore.loaded()
  }
}

function showSuccessMessage() {
  showMessage.value = true
  setTimeout(() => (showMessage.value = false), 5000)
}
</script>
