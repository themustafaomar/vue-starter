<template>
  <v-list-item class="py-1">
    <template #prepend>
      <v-avatar size="large" image="/avatar.jpg" height="80" icon />
    </template>

    <v-list-item-title class="text-wrap font-weight-medium text-h7 mb-1">
      {{ notification.data.title }}
    </v-list-item-title>

    <div class="text-body-2">
      <p class="mb-1">{{ notification.data.description.slice(0, 75) }}</p>

      <p
        class="text-decoration-none font-weight-medium d-block"
        :class="!notification.read_at ? 'text-blue-accent-4' : 'text-gray'"
      >
        {{ notification.created }}
      </p>
    </div>

    <template #append>
      <v-btn color="transparent" icon="mdi-dots-vertical" density="compact" rounded flat>
        <v-icon icon="mdi-dots-vertical" size="20" color="grey" />
        <v-menu activator="parent">
          <v-list elevation="2">
            <v-list-item @click.stop="markAsRead(notification.id)">
              <v-list-item-title>
                <v-icon size="20">mdi-check</v-icon>
                Mark as read
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click.stop="remove(notification.id)">
              <v-list-item-title>
                <v-icon size="20">mdi-close</v-icon>
                Remove this notification
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-list-item>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

defineProps({ notification: Object })

function markAsRead(id) {
  store.dispatch('notifications/markAsRead', id)
}

function remove(id) {
  store.dispatch('notifications/remove', id)
}
</script>
