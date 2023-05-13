<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto border rounded-lg pa-8">
      <app-auth-heading
        title="Sign up"
        description="Create an account - enjoy exclusive features and much more..."
      />

      <Form as="v-form" :validation-schema="schema" @submit.prevent="submit">
        <app-text-field
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
          hint="Pick a unique memorable username"
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
          :disabled="form.busy"
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
      </Form>
    </v-sheet>
  </AuthLayout>
</template>

<script>
import { Form as VForm } from 'vform'
import { Form } from 'vee-validate'
import { mapMutations } from 'vuex'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'
import { rules } from '@/validations/auth/register'

export default {
  components: { AuthLayout, AppAuthHeading, Form },
  data: () => ({
    form: new VForm({
      name: 'Muhammad',
      email: 'sdadsad@gmail.com',
      password: 'password',
      type: 'Individual',
    }),
    types: [
      { title: 'Individual', value: 1 },
      { title: 'Company', value: 2 },
      { title: 'For My Child', value: 3 },
    ],
    schema: rules,
  }),
  methods: {
    ...mapMutations('auth', ['login']),
    async submit() {
      console.log('works')
      const { data } = await this.form.post(`${import.meta.env.VITE_SERVER_URL}/register`)

      this.login(data.data)

      this.$router.push('/dashboard')
    },
  },
}
</script>
