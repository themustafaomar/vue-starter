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
      <app-tooltip-btn @click="getNotifications" path="notifications.title" v-bind="props">
        <template #icon>
          <v-badge color="red" location="top end" dot>
            <v-icon icon="mdi-bell-ring-outline" color="medium-emphasis" class="mx-1" />
          </v-badge>
        </template>
      </app-tooltip-btn>
    </template>

    <v-toolbar color="surface" density="compact" class="notifications-toolbar ps-4 pe-6">
      <h3 class="text-blue-grey-darken-3">{{ t('notifications.title') }}</h3>
    </v-toolbar>

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
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'
import AppTooltipBtn from '@/components/app/TooltipBtn.vue'
import AppDashboardBarNotificationsLoader from './Loader.vue'
import AppDashboardBarNotificationsItem from './Item.vue'

const { t } = useI18n()
const { mobile } = useDisplay()
const menu = ref(false)
const { getters, dispatch } = useStore()
const notifications = computed(() => getters['notifications/get'])
const isLoading = computed(() => getters['notifications/loading'])
const hasLoaded = computed(() => getters['notifications/loaded'])
const width = computed(() => (mobile.value ? 420 : 380))

function getNotifications() {
  if (hasLoaded.value) {
    return
  }

  dispatch('notifications/get')
}
</script>

<style lang="sass">
.notifications-menu
  box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d !important

.notifications-toolbar
  border-bottom: 1px solid #eee !important
</style>
