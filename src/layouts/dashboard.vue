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
        <div class="pa-5">
          <router-view />
        </div>
      </v-main>
      <!-- end content -->
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AppSnackbar from '@/components/common/Snackbar.vue'
import AppDashboardBar from '@/components/dashboard/Bar.vue'
import AppDashboardNavigationDrawer from '@/components/dashboard/NavigationDrawer.vue'

const rail = ref(false)
</script>
