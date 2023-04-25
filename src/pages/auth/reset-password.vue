<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto border rounded-lg pa-8">
      <v-progress-linear :active="isLoading" indeterminate absolute bottom color="blue-accent-3" />

      <app-auth-heading title="Sign in" description="Let us know your email address and we will email you a password reset that will allow you to choose a new one." />

      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field
          v-model="form.email"
          label="Username"
          persistent-hint
          hint="Username or email you used to login with"
          class="mb-5">
        </v-text-field>

        <v-text-field
          v-model="form.password"
          type="password"
          label="Password"
          persistent-hint
          hint="Pick a powerful password"
          class="mb-5">
        </v-text-field>

        <v-text-field
          v-model="form.password_confirmation"
          type="password"
          label="Password again"
          persistent-hint
          hint="Repeat the password again"
          class="mb-5">
        </v-text-field>

        <v-btn :disabled="isLoading" type="submit" block class="bg-blue-accent-3 py-5" elevation="0">
          Reset password
        </v-btn>

        <p class="text-center text-grey mt-5">
          Already have an account? <router-link to="/login" class="text-decoration-none text-blue-accent-3">sign in</router-link>
        </p>
      </v-form>
    </v-sheet>
  </AuthLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

export default {
  components: { AuthLayout, AppAuthHeading },
  data: () => ({
    form: {
      email: 'themustafaomar@gmail.com',
    }
  }),
  computed: {
    ...mapGetters({ isLoading: 'auth/isLoading' }),
  },
  methods: {
    ...mapMutations('auth', ['loading', 'loaded']),
    submit() {
    },
  }
}
</script>
