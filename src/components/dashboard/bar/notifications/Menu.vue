<template>
  <v-menu
    v-model="menu"
    close-delay="100"
    location="bottom end"
    open-delay="0"
    :close-on-content-click="false"
    :open-on-hover="false"
    :width="width"
    offset="9"
  >
    <template #activator="{ props }">
      <app-tooltip-btn path="notifications.title" v-bind="props">
        <template #icon>
          <v-badge v-if="unreadNumber" color="red" location="top end" :content="unreadNumber">
            <v-icon icon="mdi-bell-ring-outline" color="medium-emphasis" class="mx-1" />
          </v-badge>
          <v-icon v-else icon="mdi-bell-outline" color="medium-emphasis" class="mx-1" />
        </template>
      </app-tooltip-btn>
    </template>

    <v-toolbar color="surface" density="compact" class="ps-4 pe-6">
      <h3>{{ t('notifications.title') }}</h3>
    </v-toolbar>

    <v-divider />

    <v-sheet rounded="lg" class="notifications-menu overflow-hidden">
      <v-responsive max-height="400" min-height="250" style="overflow-y: scroll">
        <notifications-loader v-if="isLoading" />

        <template v-if="notifications.length">
          <v-list v-for="notification in notifications" :key="notification.id" lines="three">
            <notifications-item :notification="notification" />
          </v-list>
        </template>

        <div v-if="!notifications.length && !isLoading" class="text-center text-subtitle-1 py-8">
          <v-icon size="35" class="mx-auto mb-1">mdi-bell-outline</v-icon>
          <h4>{{ t('notifications.empty') }}</h4>
          <p class="px-2">{{ t('notifications.empty_subtitle') }}</p>
        </div>
      </v-responsive>
    </v-sheet>
  </v-menu>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useNotificationsStore } from '@/stores/notifications'
import { useUser } from '@/composables/useUser'
import AppTooltipBtn from '@/components/app/TooltipBtn.vue'
import NotificationsLoader from './Loader.vue'
import NotificationsItem from './Item.vue'

const menu = ref(false)
const width = computed(() => (mobile.value ? 420 : 380))
const user = useUser()
const notificationsStore = useNotificationsStore()
const { notifications, unreadNumber, isLoading } = storeToRefs(notificationsStore)
const { mobile } = useDisplay()
const { t } = useI18n()

onMounted(() => {
  Echo.private(`notifications.${user.id}`).notification(({ notification }) => {
    // Sometimes duplication happens we want to track this
    // and if the problem consists we will find a way to handle that.
    if (notifications.value.find((n) => n.id == notification.id)) {
      return
    }

    notifications.value.push(notification)
  })
})
</script>

<style lang="sass">
.notifications-menu
  box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d !important
</style>
