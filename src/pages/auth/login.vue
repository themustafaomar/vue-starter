<template>
  <v-sheet class="h-100 d-flex align-center" color="#f5f7fa">
    <v-sheet width="360" color="white" rounded class="mx-auto pa-8 border rounded-lg">
      <h2 class="text-center mb-2">Sign in</h2>
      <p class="text-center text-grey mb-7">Login to your account - enjoy exclusive features and much more...</p>

      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field
          v-model="username"
          :rules="rules"
          label="User name"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="Username or email you used to login with"
          autofocus
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          :rules="rules"
          label="Password"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="If you forgot your password youi can reset it"
          class="mt-5"
        ></v-text-field>

        <v-btn type="submit" color="blue" block elevation="0" class="mt-5">Sign in</v-btn>

        <!-- <div class="text-grey text-center mt-5">OR</div> -->
        <!-- <v-btn color="red" block elevation="0" class="mt-5">Sign in with Google</v-btn>
        <v-btn block :style="{ 'background-color': '#272937', color: '#888a95' }" elevation="0" class="text-white mt-5">Sign in with Github</v-btn> -->

        <p class="text-center text-grey mt-5">
          Already have an account? <router-link to="/register" class="text-decoration-none">sign up</router-link>
        </p>
      </v-form>
    </v-sheet>
  </v-sheet>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  data: vm => ({
    username: '',
    password: '',
    rules: [
      // value => vm.checkApi(value),
    ],
  }),
  methods: {
    async submit () {
      await axios.post(`/login`)
    }
  }
}
</script>
