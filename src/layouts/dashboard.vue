<template>
  <v-layout>
    <!-- snackbar -->
    <app-snackbar />
    <!-- end snackbar -->

    <!-- sidebar -->
    <app-dashboard-navigation-drawer v-model="isNavDrawerActive" :rail="rail" />
    <!-- end sidebar -->

    <!-- navbar -->
    <app-dashboard-bar @rail:switch="navigationDrawer" />
    <!-- end navbar -->

    <!-- content -->
    <v-main>
      <app-dashboard-loader v-show="isLoading" />
      <app-dashboard-error v-if="appStore.error.show" />
      <div v-else v-show="!isLoading" class="pa-5">
        <router-view />
      </div>
    </v-main>
    <!-- end content -->
  </v-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useAppStore } from '@/stores/app'
import { useNotificationsStore } from '@/stores/notifications'
import AppSnackbar from '@/components/app/Snackbar.vue'
import AppDashboardNavigationDrawer from '@/components/dashboard/NavigationDrawer.vue'
import AppDashboardLoader from '@/components/dashboard/Loader.vue'
import AppDashboardError from '@/components/dashboard/Error.vue'
import AppDashboardBar from '@/components/dashboard/bar/Bar.vue'

const rail = ref(false)
const isNavDrawerActive = ref(true)
const appStore = useAppStore()
const notificationsStore = useNotificationsStore()
const isLoading = computed(() => notificationsStore.isLoading)
const { lgAndUp, mdAndDown } = useDisplay()

// Hooks
onMounted(() => {
  notificationsStore.fetch()
  navigationDrawer(true)
})

// Methods
function navigationDrawer(isMounted) {
  // Check if we're in large screens and up
  // if so, if this function called from the mounted hook
  // we're going to force disable the rail mode.
  if (lgAndUp.value) {
    rail.value = isMounted ? false : !rail.value
  }

  // Check if we're in medium screens and down
  // if so, if this function called from the mounted hook
  // we're going to force disable the Navigation drawer.
  if (mdAndDown.value) {
    isNavDrawerActive.value = isMounted ? false : !isNavDrawerActive.value
  }
}
</script>
