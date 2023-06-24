<template>
  <v-menu
    key="language-menu"
    close-delay="100"
    location="bottom end"
    open-delay="60"
    :close-on-content-click="false"
    :open-on-hover="false"
  >
    <template #activator="{ props }">
      <v-btn v-bind="props" icon>
        <v-img
          aspect-ratio="1/1"
          cover
          :src="authStore.user.avatar"
          width="40"
          class="rounded-pill"
        >
          <template #placeholder>
            <v-skeleton-loader type="avatar" width="40" height="40" class="ma-0" />
          </template>
        </v-img>
      </v-btn>
    </template>

    <v-list elevation="4" density="compact">
      <template v-for="item in links" :key="item.title">
        <v-divider v-if="item.type === 'divider'" class="my-2" />
        <v-list-item
          v-else
          @click="handle($event, item)"
          :to="item.to"
          :disabled="item.hasLoader && authStore.isLoading"
          link
        >
          <v-list-item-title class="d-flex align-center">
            {{ item.title }}
            <v-progress-circular
              v-if="item.hasLoader && authStore.isLoading"
              color="dark"
              bg-color="transparent"
              indeterminate
              size="18"
              width="2"
              class="ms-2"
            ></v-progress-circular>
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const handle = (event, item) => {
  if (item.fn) {
    event.preventDefault()
    item.fn()
  }
}

const links = ref([
  { title: 'Profile', to: '/dashboard/profile' },
  { title: 'My subscription', to: '/' },
  { title: 'Posts & Activity', to: '/' },
  { title: 'Language', to: '/' },
  { type: 'divider', to: '/' },
  {
    title: 'Logout',
    hasLoader: true,
    fn: () => authStore.logout(),
    to: '/',
  },
])
</script>
<style>
.v-skeleton-loader__avatar {
  margin: 0;
}
</style>