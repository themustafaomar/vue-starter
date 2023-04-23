<template>
  <v-sheet class="h-100">
    <v-sheet width="360" color="white" rounded class="mx-auto pa-8 border rounded-lg mt-16">
      <h2 class="text-center mb-2">Sign in</h2>
      <p class="text-center text-grey mb-7">Login to your account - enjoy exclusive features and much more...</p>

      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field
          v-model="userName"
          :rules="rules"
          label="Full name"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="A full name is composed of first/last name"
          class="mb-5"
        ></v-text-field>

        <v-text-field
          v-model="userName"
          :rules="rules"
          label="User name"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="Username or email you used to login with"
        ></v-text-field>

        <v-text-field
          v-model="userName"
          type="password"
          :rules="rules"
          label="Password"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="If you forgot your password youi can reset it"
          class="mt-5"
        ></v-text-field>

        <v-text-field
          v-model="userName"
          type="password"
          :rules="rules"
          label="Password"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="Repeat the password again"
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
export default {
  data: vm => ({
    userName: '',
    rules: [
      value => vm.checkApi(value),
    ],
    timeout: null,
  }),
  methods: {
    async submit (event) {
      const results = await event
      alert(JSON.stringify(results, null, 2))
    },
    async checkApi (userName) {
      return new Promise(resolve => {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          if (!userName) return resolve('Please enter a user name.')
          if (userName === 'johnleider') return resolve('User name already taken. Please try another one.')

          return resolve(true)
        }, 1000)
      })
    },
  },
}
</script>

<style lang="scss">
#login-page {
  .v-application {
    background-color: #f5f7fa;
  }
}
</style>
