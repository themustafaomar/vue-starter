<template>
  <v-app :style="{ 'background-color': $vuetify.theme.current.colors.background }">
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
        <app-dashboard-error v-if="state.app.error.show" />
        <div v-else class="pa-5">
          <router-view />
        </div>
      </v-main>
      <!-- end content -->
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import AppSnackbar from '@/components/common/Snackbar.vue'
import AppDashboardBar from '@/components/dashboard/Bar.vue'
import AppDashboardNavigationDrawer from '@/components/dashboard/NavigationDrawer.vue'
import AppDashboardError from '@/components/dashboard/Error.vue'

const { state } = useStore()
const rail = ref(false)
</script>
