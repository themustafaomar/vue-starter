<template>
  <v-menu
    close-delay="100"
    location="bottom end"
    open-delay="60"
    key="language-menu"
    :close-on-content-click="false"
    :open-on-hover="false"
  >
    <template #activator="{ props }">
      <v-btn v-bind="props" icon>
        <v-avatar image="/avatar.jpg" />
      </v-btn>
    </template>

    <v-list elevation="4" density="compact">
      <template v-for="item in links" :key="item.title">
        <v-divider v-if="item.type === 'divider'" class="my-2" />
        <v-list-item v-else link :to="item.to" @click="handle($event, item)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const handle = (event, item) => {
  if (item.fn) {
    event.preventDefault()
    item.fn()
  }
}

const links = ref([
  { title: 'Profile', to: '/' },
  { title: 'My subscription', to: '/' },
  { title: 'Posts & Activity', to: '/' },
  { title: 'Language', to: '/' },
  { type: 'divider', to: '/' },
  { title: 'Logout', fn: () => store.dispatch('auth/logout'), to: '/' },
])
</script>
