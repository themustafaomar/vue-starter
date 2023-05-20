<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto border rounded-lg pa-8">
      <app-auth-heading
        title="Sign up"
        description="Create an account - enjoy exclusive features and much more..."
      />

      <v-form @submit.prevent="submit">
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
          :disabled="form.busy || !isValid"
          elevation="0"
          color="primary"
          block
          class="mt-5 py-5"
        >
          <app-btn-loader :state="form.busy" text="Sign in" />
        </v-btn>

        <p class="text-center text-grey mt-5">
          Already have an account?
          <router-link to="/login" class="text-decoration-none text-primary">sign in</router-link>
        </p>
      </v-form>
    </v-sheet>
  </AuthLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { Form } from 'vform'
import { useRouter } from 'vue-router'
import { useValidator } from '@/composables/useValidator'
import { registerValidation } from '@/validations/auth'
import axios from '@/plugins/axios'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

const router = useRouter()
const { commit } = useStore()
const { handleSubmit, isValid } = useValidator(registerValidation)
const form = reactive(
  new Form({
    name: '',
    email: '',
    password: '',
    type: 1,
  })
)
const types = ref([
  { title: 'Individual', value: 1 },
  { title: 'Company', value: 2 },
  { title: 'For My Child', value: 3 },
])

// Functions

const submit = handleSubmit(async () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL

  await axios.get(`${SERVER_URL}/sanctum/csrf-cookie`)

  const { data } = await form.post(`${SERVER_URL}/register`)

  commit('auth/login', {
    user: data.data,
    permissions: data.permissions,
  })

  router.push('/dashboard')
})
</script>
