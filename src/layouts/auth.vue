<template>
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
</template>

<script setup>
import { useIsDark } from '@/composables/useIsDark'
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
    background-image: linear-gradient(-45deg, rgba(var(--v-theme-surface), 0.85) 70%, transparent)
    z-index: -1

.theme-toggler
  position: absolute
  z-index: 5
  right: 20px
  top: 15px
</style>
