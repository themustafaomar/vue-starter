<template>
  <v-list-item-title class="text-wrap font-weight-medium text-h7 mb-1">
    {{ notification.data.title }}
  </v-list-item-title>

  <div class="text-body-2">
    <p class="mb-1">{{ notification.data.description.slice(0, 75) }}</p>

    <div class="mb-2">
      <v-btn @click.prevent="accpet" :disabled="hasAccepted" color="primary" elevation="0">
        Accept
      </v-btn>
      <v-btn
        @click.prevent
        :disabled="hasAccepted"
        color="red"
        class="ms-2"
        elevation="0"
        variant="outlined"
      >
        Decline
      </v-btn>
    </div>

    <p
      class="text-decoration-none font-weight-medium d-block"
      :class="!notification.read_at ? 'text-blue-accent-4' : 'text-gray'"
    >
      {{ notification.created }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

defineProps({ notification: Object })

const hasAccepted = ref(false)
const { notify } = useAppStore()

// Functions

const accpet = () => {
  // Your accept bussiness goes here..
  // For a better UX we need to mark this notification as read
  // once the user has accepted or event rejected the friend request.
  hasAccepted.value = true

  notify("Congratulations! your're friends!")
}
</script>
