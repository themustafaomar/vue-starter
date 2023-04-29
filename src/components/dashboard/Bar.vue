<template>
  <v-app-bar elevation="0" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="$emit('rail:switch')" />

    <v-toolbar-title class="text-uppercase text-medium-emphasis">Wakeb</v-toolbar-title>

    <v-text-field
      density="compact"
      placeholder="Search term..."
      prepend-inner-icon="mdi-magnify"
      class="rounded-pill mt-5"
    />

    <v-spacer></v-spacer>

    <template #append>
      <v-btn variant="text">Home</v-btn>

      <v-btn variant="text">Blog</v-btn>

      <v-btn variant="text">Other</v-btn>

      <v-divider class="mx-2 my-auto" style="height: 16px" inset vertical />

      <theme-toggle />

      <v-divider class="mx-2 my-auto" style="height: 16px" inset vertical />

      <app-bar-notifications-menu />

      <app-bar-language-menu />

      <app-settings-menu />
    </template>
  </v-app-bar>
</template>

<script setup>
import ThemeToggle from '../common/bar/ThemeToggle.vue'
import AppBarNotificationsMenu from '../common/bar/NotificationsMenu.vue'
import AppBarLanguageMenu from '../common/bar/LanguageMenu.vue'
import AppSettingsMenu from '../common/bar/SettingsMenu.vue'
</script>
