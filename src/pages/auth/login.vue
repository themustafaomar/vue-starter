<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto pa-8 rounded-lg">
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

      <Form v-slot="{ meta }" :validation-schema="loginValidation" as="form" @submit="login">
        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
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
          placeholder="Your Password"
          hint="If you forgot your password you can reset it"
          persistent-hint
          required
          class="mb-5"
        ></app-text-field>

        <v-btn
          type="submit"
          :disabled="authStore.isLoading || !meta.valid"
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
          type="submit"
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
      </Form>
    </v-sheet>
  </AuthLayout>
</template>

<script setup>
import { Form } from 'vee-validate'
import { useForm } from '@/composables/useForm'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { loginValidation } from '@/validations/auth'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

const appStore = useAppStore()
const authStore = useAuthStore()
const form = useForm({
  email: 'themustafaomar@gmail.com',
  password: 'password',
})

// Functions

const login = async () => {
  await authStore.signin(form)
  appStore.notify('Logged in successfully!')
}
</script>
