<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto border rounded-lg pa-8">
      <app-auth-heading
        title="Sign up"
        description="Create an account - enjoy exclusive features and much more..."
      />

      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field
          v-model="form.full_name"
          label="Fullname"
          persistent-hint
          hint="A full name is composed of first/last name"
          class="mb-5"
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          label="Username"
          persistent-hint
          hint="Pick a unique memorable username"
          class="mb-5"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          type="password"
          label="Password"
          persistent-hint
          hint="Please choose a strong password"
          class="mb-5"
        ></v-text-field>

        <v-select
          label="Account Type"
          v-model="form.type"
          :items="['Individual', 'Company', 'For My Child']"
          variant="outlined"
          persistent-hint
          hint="Choose the account type"
        ></v-select>

        <v-btn type="submit" block class="bg-primary mt-5 py-5" elevation="0">Sign in</v-btn>

        <p class="text-center text-grey mt-5">
          Already have an account?
          <router-link to="/login" class="text-decoration-none text-primary">sign in</router-link>
        </p>
      </v-form>
    </v-sheet>
  </AuthLayout>
</template>

<script>
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

export default {
  components: { AuthLayout, AppAuthHeading },
  data: () => ({
    form: {
      full_name: '',
      email: '',
      password: '',
      type: 'Individual',
    },
    timeout: null,
  }),
  methods: {
    submit() {
      // ..
    },
  },
}
</script>
