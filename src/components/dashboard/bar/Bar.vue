<template>
  <v-app-bar :style="{ position: 'fixed' }" elevation="0" prominent>
    <v-app-bar-nav-icon
      @click.stop="$emit('rail:switch')"
      variant="text"
      color="grey-darken-1"
      :ripple="false"
    />

    <v-toolbar-title text="Wakeb" class="text-uppercase text-medium-emphasis" />

    <v-text-field
      v-if="lgAndUp"
      density="compact"
      placeholder="Search term..."
      prepend-inner-icon="mdi-magnify"
      class="rounded-pill mt-5"
    />

    <v-spacer></v-spacer>

    <template #append>
      <template v-if="lgAndUp">
        <v-btn variant="text">Home</v-btn>

        <v-btn variant="text">Blog</v-btn>

        <v-btn variant="text">Other</v-btn>
      </template>

      <v-divider class="mx-2 my-auto" style="height: 16px" inset vertical />

      <app-theme-toggle />

      <v-divider class="mx-2 my-auto" style="height: 16px" inset vertical />

      <app-bar-notifications-menu />

      <app-bar-language-menu />

      <app-settings-menu />
    </template>
  </v-app-bar>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import AppSettingsMenu from './SettingsMenu.vue'
import AppBarLanguageMenu from './LanguageMenu.vue'
import AppThemeToggle from '@/components/app/ThemeToggle.vue'
import AppBarNotificationsMenu from './notifications/NotificationsMenu.vue'

const { lgAndUp } = useDisplay()
</script>
