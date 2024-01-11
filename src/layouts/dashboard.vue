<template>
  <v-layout>
    <!-- snackbar -->
    <app-snackbar />
    <!-- end snackbar -->

    <!-- sidebar -->
    <drawer v-model="isNavDrawerActive" :rail="rail" />
    <!-- end sidebar -->

    <!-- navbar -->
    <bar @rail:switch="navigationDrawer" />
    <!-- end navbar -->

    <!-- content -->
    <v-main>
      <loader v-show="isLoading" />
      <div v-show="!isLoading" class="pa-4 pa-lg-6">
        <router-view />
      </div>
    </v-main>
    <!-- end content -->
  </v-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { useAppStore } from '@/stores/app'
import { useNotificationsStore } from '@/stores/notifications'
import AppSnackbar from '@/components/app/Snackbar.vue'
import Drawer from '@/components/dashboard/drawer/NavigationDrawer.vue'
import Loader from '@/components/dashboard/Loader.vue'
import Bar from '@/components/dashboard/bar/Bar.vue'

const rail = ref(false)
const isNavDrawerActive = ref(true)
const { fetch } = useNotificationsStore()
const { isLoading } = storeToRefs(useAppStore())
const { lgAndUp, mdAndDown } = useDisplay()

// Hooks
onMounted(() => {
  fetch()
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
