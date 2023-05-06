<template>
  <v-app>
    <v-layout>
      <!-- snackbar -->
      <app-snackbar />
      <!-- end snackbar -->

      <!-- sidebar -->
      <app-dashboard-navigation-drawer :rail="rail" />
      <!-- end sidebar -->

      <!-- navbar -->
      <app-dashboard-bar @rail:switch="rail = !rail" />
      <!-- end navbar -->

      <!-- content -->
      <v-main>
        <app-loader v-show="isLoading" />
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
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppSnackbar from '@/components/app/Snackbar.vue'
import AppLoader from '@/components/dashboard/Loader.vue'
import AppDashboardBar from '@/components/dashboard/bar/Bar.vue'
import AppDashboardNavigationDrawer from '@/components/dashboard/NavigationDrawer.vue'
import AppDashboardError from '@/components/dashboard/Error.vue'

const rail = ref(false)
const { state, dispatch } = useStore()
const isLoading = computed(() => state.app.isLoading)

onMounted(() => {
  dispatch('notifications/get')
})
</script>
