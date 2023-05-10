<template>
  <v-list-item class="py-1 ps-4 pe-2">
    <template #prepend>
      <!-- <v-avatar size="large" image="/avatar.jpg" height="80" icon /> -->
      <v-badge
        color="primary"
        location="bottom end"
        class="pe-4"
        offset-y="4"
        offset-x="4"
        icon="mdi-account-circle"
      >
        <v-avatar size="large" image="/avatar.jpg" height="80" />
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
            @click.stop="markAsRead(notification.id)"
            :disabled="typeof notification.read_at === 'string'"
          >
            <v-list-item-title>
              <v-icon size="20">mdi-read</v-icon>
              Mark as read
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click.stop="remove(notification.id)">
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
import { useStore } from 'vuex'

const store = useStore()
const isActive = ref(false)
const { notification } = defineProps({ notification: Object })
const getComponent = computed(() =>
  defineAsyncComponent(() => import(`./templates/${notification.data.template}.vue`))
)

function markAsRead(id) {
  store.dispatch('notifications/markAsRead', id)

  _forceCloseMenu()
}

function remove(id) {
  store.dispatch('notifications/remove', id)

  _forceCloseMenu()
}

function _forceCloseMenu() {
  isActive.value = false
}
</script>
