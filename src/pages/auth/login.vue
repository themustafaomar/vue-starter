<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto pa-8 border rounded-lg">
      <v-progress-linear :active="isLoading" color="primary" indeterminate absolute bottom />

      <app-auth-heading
        title="Sign in"
        description="Login to your account - enjoy exclusive features and much more..."
      />

      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field
          v-model="form.email"
          label="Username"
          persistent-hint
          hint="Username or email you used to login with"
          class="mb-5"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          type="password"
          label="Password"
          persistent-hint
          hint="If you forgot your password youi can reset it"
          class="mb-5"
        ></v-text-field>

        <v-btn type="submit" :disabled="isLoading" block class="bg-primary py-5" elevation="0">
          Sign in
        </v-btn>

        <div class="text-grey text-center mt-5">OR</div>

        <v-btn
          block
          @click.prevent="$router.push({ name: 'register' })"
          :disabled="isLoading"
          :style="{ 'background-color': '#1e293b' }"
          class="text-white font-weight-normal py-5 mt-5"
          elevation="0"
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

<script>
import { mapActions, mapGetters } from 'vuex'
import AuthLayout from '@/layouts/auth.vue'
import { emitter } from '@/utils'
import AppAuthHeading from '@/components/auth/Heading.vue'

export default {
  components: { AuthLayout, AppAuthHeading },
  data: () => ({
    form: {
      email: 'themustafaomar@gmail.com',
      password: 'password',
    },
  }),
  computed: {
    ...mapGetters({ isLoading: 'auth/isLoading' }),
  },
  methods: {
    ...mapActions({ login: 'auth/login' }),
    submit() {
      this.login(this.form).then(() => {
        emitter.emit('toast:show', {
          message: 'Logged in successfully!',
          color: 'success',
        })
      })
    },
  },
}
</script>
