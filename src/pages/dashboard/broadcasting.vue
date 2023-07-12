<template>
  <app-sheet title="Broadcasting">
    This is an example of broadcasting using public channels
    <p class="mb-3">Loaded records: {{ users.length }} / Total clicks: {{ counter }}</p>

    <v-btn @click="brodacast(), counter++" color="primary" elevation="0">
      Get random user from the database
    </v-btn>

    <v-btn @click=";(users = []), (counter = 0)" color="red" elevation="0" class="ms-3">
      Reset
    </v-btn>
  </app-sheet>

  <div
    ref="broadcastContainer"
    class="bg-surface rounded-lg mt-5 px-5"
    style="overflow-y: auto; overflow-x: hidden; height: 300px"
  >
    <template v-if="users.length">
      <TransitionGroup name="list" tag="div">
        <v-sheet v-for="(user, index) in users" :key="index" rounded="lg" class="border pa-3 my-5">
          #{{ index + ' ' + user.name }} - {{ user.email }}
        </v-sheet>
      </TransitionGroup>
    </template>
    <p v-else class="text-center mx-auto mt-16">No data came from any channels yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'
import axios from '@/plugins/axios'

const users = ref([])
const counter = ref(0)
const broadcastContainer = ref(null)
const loader = useLoader()

onMounted(() => {
  Echo.channel('Testing').listen('RandomUserFetched', ({ user }) => {
    users.value.push(user)
    setTimeout(() => {
      const element = broadcastContainer.value
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
    }, 50)
  })
  loader.markAsLoaded()
})

// Functions

const brodacast = () => {
  axios.get('/broadcasting/random/user')
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
