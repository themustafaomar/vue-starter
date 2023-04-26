<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto border rounded-lg pa-8">
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

      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field
          v-model="form.email"
          label="Username"
          persistent-hint
          hint="Username or email you used to login with"
          class="mb-5"
        ></v-text-field>

        <v-btn :disabled="isLoading" type="submit" block class="bg-primary py-5" elevation="0">
          Send verification code
        </v-btn>

        <p class="text-center text-grey mt-5">
          Already have an account?
          <router-link to="/login" class="text-decoration-none text-primary">sign in</router-link>
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
    showMessage: false,
    form: {
      email: 'themustafaomar@gmail.com',
    },
  }),
  computed: {
    ...mapGetters({ isLoading: 'auth/isLoading' }),
  },
  methods: {
    ...mapMutations('auth', ['loading', 'loaded']),
    submit() {
      this.loading()

      setTimeout(() => {
        this.loaded()
        this.showSuccessMessage()
      }, 1500)
    },
    showSuccessMessage() {
      this.showMessage = true
      setTimeout(() => (this.showMessage = false), 5000)
    },
  },
}
</script>
