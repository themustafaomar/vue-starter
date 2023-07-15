<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto rounded-lg pa-8">
      <app-auth-heading
        title="Sign up"
        description="Create an account - enjoy exclusive features and much more..."
      />

      <Form v-slot="{ meta }" :validation-schema="registerValidation" as="form" @submit="register">
        <app-text-field
          v-model="form.name"
          :form="form"
          name="name"
          label="Name"
          placeholder="Your Name"
          persistent-placeholder
          hint="A full name is composed of first/last name"
          persistent-hint
          required
          class="mb-4"
        ></app-text-field>

        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
          label="Email"
          persistent-placeholder
          placeholder="Your email"
          hint="We'll sent updates in this email"
          persistent-hint
          required
          class="mb-4"
        ></app-text-field>

        <app-text-field
          v-model="form.password"
          type="password"
          :form="form"
          name="password"
          label="Password"
          placeholder="Your password"
          hint="Please choose a strong password"
          persistent-hint
          required
          class="mb-4"
        ></app-text-field>

        <app-select
          v-model="form.type"
          :form="form"
          name="type"
          label="Account Type"
          :items="types"
          hint="Choose the account type"
          persistent-hint
        ></app-select>

        <v-btn
          type="submit"
          :disabled="isLoading || !meta.valid"
          :loading="isLoading"
          elevation="0"
          color="primary"
          block
          class="mt-5 py-5"
        >
          Sign up
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
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useForm } from '@/composables/useForm'
import { registerValidation } from '@/validations/auth'
import axios from '@/plugins/axios'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

const router = useRouter()
const authStore = useAuthStore()
const { isLoading } = storeToRefs(authStore)
const { loading, loaded, login } = authStore
const form = useForm({
  name: '',
  email: '',
  password: '',
  type: 1,
})
const types = ref([
  { title: 'Individual', value: 1 },
  { title: 'Company', value: 2 },
  { title: 'For My Child', value: 3 },
])

// Functions

const register = async () => {
  loading()

  const SERVER_URL = import.meta.env.VITE_SERVER_URL

  await axios.get(`${SERVER_URL}/sanctum/csrf-cookie`)

  const { data } = await form.post(`${SERVER_URL}/register`)

  login({
    user: data.data,
    permissions: data.permissions,
  })

  router.push('/dashboard').then(() => {
    loaded()
  })
}
</script>
