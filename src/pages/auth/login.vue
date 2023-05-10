<template>
  <AuthLayout>
    <v-sheet width="360" rounded class="position-relative mx-auto pa-8 border rounded-lg">
      <v-progress-linear :active="isLoading" color="primary" indeterminate absolute bottom />

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

        <v-btn type="submit" :disabled="isLoading" block elevation="0" class="bg-primary py-5">
          <app-btn-loader :state="isLoading" text="Sign in" />
        </v-btn>

        <div class="text-grey text-center mt-5">OR</div>

        <v-btn
          @click.prevent="$router.push({ name: 'register' })"
          :disabled="isLoading"
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

<script>
import { Form } from 'vform'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AuthLayout from '@/layouts/auth.vue'
import AppAuthHeading from '@/components/auth/Heading.vue'

export default {
  components: { AuthLayout, AppAuthHeading },
  data: () => ({
    form: new Form({
      email: 'themustafaomar@gmail.com',
      password: 'password',
    }),
  }),
  computed: {
    ...mapGetters({ isLoading: 'auth/isLoading' }),
  },
  methods: {
    ...mapMutations(['notify']),
    ...mapActions({ login: 'auth/login' }),
    submit() {
      this.login(this.form).then(() => {
        this.notify({
          message: 'Logged in successfully!',
          color: 'primary',
        })
      })
    },
  },
}
</script>
