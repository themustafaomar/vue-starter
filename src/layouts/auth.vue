<template>
  <v-app>
    <!-- snackbar -->
    <app-snackbar />
    <!-- end snackbar -->

    <!-- theme toggler -->
    <div class="theme-toggler">
      <app-theme-toggle />
    </div>
    <!-- end theme toggler -->

    <!-- wrapper -->
    <v-sheet
      color="background"
      class="h-100 d-flex align-center"
      :class="{ 'auth-dark-wrapper': isDark }"
    >
      <slot></slot>
    </v-sheet>
    <!-- end wrapper -->
  </v-app>
</template>

<script setup>
import { useIsDark } from '@/composables/is-dark'
import AppThemeToggle from '@/components/app/ThemeToggle.vue'
import AppSnackbar from '@/components/app/Snackbar.vue'

const isDark = useIsDark()
</script>

<style lang="sass">
.v-sheet.auth-dark-wrapper
  background: url('/vector-background.jpg')
  background-size: cover
  position: relative
  z-index: 1

  &:after
    content: ''
    display: block
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(var(--v-theme-surface), 0.875)
    z-index: -1

.theme-toggler
  position: absolute
  z-index: 5
  right: 20px
  top: 15px
</style>
