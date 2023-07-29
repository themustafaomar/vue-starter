<template>
  <v-list-item ref="notificationHeight" class="py-1 ps-4 pe-2">
    <template #prepend>
      <!-- <v-avatar size="large" image="/avatar.jpg" height="80" icon /> -->
      <v-badge
        color="primary"
        location="bottom end"
        class="pe-4"
        offset-y="4"
        offset-x="4"
        bordered
        icon="mdi-bell"
      >
        <v-avatar size="large" image="/avatar.jpg" />
      </v-badge>
    </template>

    <component :is="getComponent" :notification="notification" />

    <template #append>
      <v-btn color="transparent" icon="mdi-dots-vertical" density="compact" rounded flat>
        <v-icon icon="mdi-dots-vertical" size="20" color="grey" />
      </v-btn>

      <v-menu v-model="isActive" activator="parent">
        <v-list elevation="2" rounded="lg">
          <v-list-item
            @click.stop="markAsRead(notification.id), forceCloseMenu()"
            :disabled="!!notification.read_at"
          >
            <v-list-item-title>
              <v-icon size="20">mdi-read</v-icon>
              Mark as read
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click.stop="remove(notification.id), forceCloseMenu()">
            <v-list-item-title>
              <v-icon size="20">mdi-trash-can-outline</v-icon>
              Remove this notification
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'

const { notification } = defineProps({ notification: Object })
const isActive = ref(false)
const getComponent = computed(() =>
  defineAsyncComponent(() => import(`./templates/${notification.data.template}.vue`))
)
const { markAsRead, remove } = useNotificationsStore()

// Functions

const forceCloseMenu = () => {
  isActive.value = false
}
</script>
