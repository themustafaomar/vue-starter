<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto border rounded-lg pa-8">
      <v-progress-linear :active="isLoading" color="primary" indeterminate absolute bottom />

      <app-auth-heading
        title="Sign in"
        description="Enter a new password to reset the password on your account, we'll ask for this password whenever you login"
      />

      <v-form @submit.prevent="submit">
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

        <app-text-field
          v-model="form.password"
          type="password"
          :form="form"
          name="password"
          label="Password"
          placeholder="Your Password"
          persistent-placeholder
          hint="Pick a powerful password"
          persistent-hint
          required
          class="mb-5"
        ></app-text-field>

        <app-text-field
          v-model="form.password_confirmation"
          type="password"
          :form="form"
          name="password"
          label="Confirm Password"
          placeholder="Your Password Again"
          persistent-placeholder
          hint="Confirm your password"
          persistent-hint
          required
          class="mb-5"
        ></app-text-field>

        <v-btn :disabled="isLoading" type="submit" block class="bg-primary py-5" elevation="0">
          <app-btn-loader :state="form.busy" text="Reset Password" />
        </v-btn>

        <p class="text-center text-grey mt-5">
          Know your password?
          <router-link to="/login" class="text-decoration-none text-primary">sign in</router-link>
        </p>
      </v-form>
    </v-sheet>
  </AuthLayout>
</template>

<script>
import { Form } from 'vform'
import { mapGetters, mapMutations } from 'vuex'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

export default {
  components: { AuthLayout, AppAuthHeading },
  data: ({ $route }) => ({
    form: new Form({
      email: $route.query.email,
      token: $route.params.token,
      password: '',
      password_confirmation: ''
    })
  }),
  computed: {
    ...mapGetters({ isLoading: 'auth/isLoading' })
  },
  methods: {
    ...mapMutations({
      loading: 'auth/loading',
      loaded: 'auth/loaded',
      notify: 'app/notify'
    }),
    submit() {
      this.loading()

      this.form
        .post(`${import.meta.env.VITE_SERVER_URL}/reset-password`)
        .then(({ data }) => {
          this.loaded()
          this.notify({
            message: data.status,
            color: 'primary'
          })
          this.$router.push('/login')
        })
        .catch((error) => {
          this.loaded()
          this.notify({
            message: error.response.data.message,
            color: 'red'
          })
        })

      this.loaded()
    }
  }
}
</script>
