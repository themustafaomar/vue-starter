<template>
  <v-sheet width="300" class="mx-auto border rounded-lg pa-5 mt-16">
    Hi! want to
    <router-link to="/login" class="text-decoration-none text-primary">login?</router-link>
  </v-sheet>

  <v-sheet class="border mx-auto rounded-lg pa-6 mt-16" width="75%">
    <p class="text-grey-darken-3 mb-7">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam totam aliquid libero omnis
      earum iusto! Fugit maiores doloremque veritatis eius ab voluptas? Maxime modi ratione commodi
      recusandae distinctio earum quaerat!
    </p>
    <v-btn @click="deploy" :disabled="isLoading" :loading="isLoading" color="primary" elevation="0">
      Deploy
    </v-btn>
  </v-sheet>

  <v-sheet color="grey-darken-4" width="75%" class="rounded-lg mx-auto pa-5 mt-6">
    <pre><code ref="content"></code></pre>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const content = ref()
const isLoading = ref(false)

onMounted(() => {
  Echo.channel('Deployer').listen('DeployerLine', ({ line }) => {
    content.value.innerHTML = content.value.innerHTML + line + '<br>'
  })
})

const deploy = () => {
  isLoading.value = true

  // axios.get('/api/deploy').then((res) => {
  // console.log(res)
  // })
  // Start the AJAX request
  // const eventSource = new EventSource('/api/deploy')

  // eventSource.onmessage = function (event) {
  // Update the output div with the received message
  // console.log(event.data)
  // }

  // eventSource.onerror = function () {
  // Handle any errors
  //   console.log('Error occurred')
  // }
}
</script>

<style>
#welcome__page {
  background-color: rgba(var(--v-theme-background), 0.25);
}
</style>
