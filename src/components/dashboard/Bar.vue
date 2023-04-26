<template>
  <v-app-bar elevation="0" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="$emit('rail:switch')" />

    <v-toolbar-title class="text-uppercase text-grey-darken-1">Wakeb</v-toolbar-title>

    <v-text-field
      density="compact"
      placeholder="Search term..."
      prepend-inner-icon="mdi-magnify"
      class="rounded-pill mt-5" />

    <v-spacer></v-spacer>

    <template #append>
      <v-btn variant="text">Home</v-btn>

      <v-btn variant="text">Blog</v-btn>

      <v-btn variant="text">Other</v-btn>

      <v-divider class="mx-2 my-auto" inset vertical style="height: 16px" />

      <theme-toggle />

      <v-divider class="mx-2 my-auto" inset vertical style="height: 16px" />

      <app-bar-notifications-menu />

      <app-bar-language-menu />

      <app-settings-menu />
    </template>
  </v-app-bar>
</template>

<script setup>
import ThemeToggle from '../app/common/ThemeToggle.vue'
import AppBarNotificationsMenu from '../app/bar/NotificationsMenu.vue'
import AppBarLanguageMenu from '../app/bar/LanguageMenu.vue'
import AppSettingsMenu from '../app/bar/SettingsMenu.vue'
</script>
