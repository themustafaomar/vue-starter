<template>
  <v-app>
    <v-layout>
      <!-- snackbar -->
      <app-snackbar />
      <!-- end snackbar -->

      <!-- sidebar -->
      <app-dashboard-navigation-drawer v-model="isNavDrawerActive" :rail="rail" />
      <!-- end sidebar -->

      <!-- navbar -->
      <app-dashboard-bar @rail:switch="handleNavigationDrawer" />
      <!-- end navbar -->

      <!-- content -->
      <v-main>
        <app-dashboard-loader v-show="isLoading" />
        <app-dashboard-error v-if="state.app.error.show" />
        <div v-else v-show="!isLoading" class="pa-5">
          <router-view />
        </div>
      </v-main>
      <!-- end content -->
    </v-layout>
  </v-app>
</template>

<script setup>
import { useStore } from 'vuex'
import { useDisplay } from 'vuetify'
import { ref, computed, onMounted } from 'vue'
import AppSnackbar from '@/components/app/Snackbar.vue'
import AppDashboardLoader from '@/components/dashboard/Loader.vue'
import AppDashboardBar from '@/components/dashboard/bar/Bar.vue'
import AppDashboardNavigationDrawer from '@/components/dashboard/NavigationDrawer.vue'
import AppDashboardError from '@/components/dashboard/Error.vue'

const rail = ref(false)
const isNavDrawerActive = ref(true)
const { lgAndUp, mdAndDown } = useDisplay()
const { state, dispatch } = useStore()
const isLoading = computed(() => state.app.isLoading)

// Hooks
onMounted(() => {
  dispatch('notifications/get')
  handleNavigationDrawer(true)
})

// Methods
function handleNavigationDrawer(isMounted) {
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
