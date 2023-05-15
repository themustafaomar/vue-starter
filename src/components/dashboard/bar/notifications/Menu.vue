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
          <v-badge v-if="hasUnread" color="red" location="top end" :content="unreadNumber">
            <v-icon icon="mdi-bell-ring-outline" color="medium-emphasis" class="mx-1" />
          </v-badge>
          <v-icon v-else icon="mdi-bell-ring-outline" color="medium-emphasis" class="mx-1" />
        </template>
      </app-tooltip-btn>
    </template>

    <v-toolbar color="surface" density="compact" class="ps-4 pe-6">
      <h3>{{ t('notifications.title') }}</h3>
    </v-toolbar>

    <v-divider />

    <v-sheet rounded="lg" class="notifications-menu overflow-hidden">
      <v-responsive max-height="400" min-height="250" style="overflow-y: scroll">
        <app-dashboard-bar-notifications-loader v-if="isLoading" />

        <template v-if="notifications.length">
          <v-list v-for="notification in notifications" :key="notification.id" lines="three">
            <app-dashboard-bar-notifications-item :notification="notification" />
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
import { useStore } from 'vuex'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'
import AppTooltipBtn from '@/components/app/TooltipBtn.vue'
import AppDashboardBarNotificationsLoader from './Loader.vue'
import AppDashboardBarNotificationsItem from './Item.vue'

const { t } = useI18n()
const { mobile } = useDisplay()
const menu = ref(false)
const { getters, commit } = useStore()
const notifications = computed(() => getters['notifications/get'])
const unreadNumber = computed(() => getters['notifications/unreadNumber'])
const isLoading = computed(() => getters['notifications/loading'])
const hasUnread = computed(() => getters['notifications/hasUnread'])
const user = computed(() => getters['auth/user'])
const width = computed(() => (mobile.value ? 420 : 380))

onMounted(() => {
  Echo.private(`notifications.${user.value.id}`).notification(({ notification }) => {
    // Sometimes duplication happens, as a developer
    // we want to track this, and if the problem consists
    // we will find a way to handle that.
    if (notifications.value.find((n) => n.id == notification.id)) {
      return
    }

    commit('notifications/push', notification)
  })
})
</script>

<style lang="sass">
.notifications-menu
  box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d !important
</style>
