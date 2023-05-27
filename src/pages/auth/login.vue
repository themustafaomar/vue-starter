<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto pa-8 border rounded-lg">
      <v-progress-linear
        :active="authStore.isLoading"
        color="primary"
        indeterminate
        absolute
        bottom
      />

      <app-auth-heading
        title="Sign in"
        description="Login to your account - enjoy exclusive features and much more..."
      />

      <v-form @submit.prevent="submit">
        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
          label="Email"
          placeholder="Your Username"
          hint="Username or email you used to login with"
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
          hint="If you forgot your password you can reset it"
          persistent-hint
          required
          class="mb-5"
        ></app-text-field>

        <v-btn
          type="submit"
          :disabled="authStore.isLoading || !isValid"
          :loading="authStore.isLoading"
          color="primary"
          block
          elevation="0"
          class="py-5"
        >
          Sign in
        </v-btn>

        <div class="text-grey text-center mt-5">OR</div>

        <v-btn
          @click.prevent="$router.push({ name: 'register' })"
          :disabled="authStore.isLoading"
          :style="{ 'background-color': '#1e293b' }"
          class="text-white font-weight-normal py-5 mt-5"
          elevation="0"
          block
        >
          Create an account
        </v-btn>

        <p class="text-center text-grey mt-5">
          Forgot your password?
          <router-link to="/forgot-password" class="text-decoration-none text-primary">
            reset it
          </router-link>
        </p>
      </v-form>
    </v-sheet>
  </AuthLayout>
</template>

<script setup>
import { useForm } from '@/composables/useForm'
import { useValidator } from '@/composables/useValidator'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { loginValidation } from '@/validations/auth'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

const appStore = useAppStore()
const authStore = useAuthStore()
const { handleSubmit, isValid } = useValidator(loginValidation)
const form = useForm({
  email: 'themustafaomar@gmail.com',
  password: 'password',
})

// Functions

const submit = handleSubmit(async () => {
  await authStore.signin(form)
  appStore.notify('Logged in successfully!')
})
</script>
