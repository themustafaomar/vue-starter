<template>
  <v-app-bar border="b" flat>
    <template #prepend>
      <router-link to="/" class="d-inline-block ms-4 me-2">
        <v-img :key="'logo'" src="/logo.svg" :width="35" class="shrink" :transition="false"></v-img>
      </router-link>

      <!-- @click="app.drawer = !app.drawer" -->
      <v-btn v-if="mdAndDown" icon="mdi-menu" />

      <!-- <app-search /> -->
    </template>

    <template #append>
      <template v-if="mdAndUp">
        <app-btn class="ms-1" color="medium-emphasis" text="home" variant="text" />

        <app-btn
          href="https://play.vuetifyjs.com"
          target="_blank"
          rel="noopener noreferrer"
          class="ms-1"
          color="medium-emphasis"
          variant="text"
          text="playground"
        />

        <app-btn
          to="/introduction/sponsors-and-backers"
          class="ms-1"
          color="medium-emphasis"
          variant="text"
          text="sponsor"
        />

        <app-btn
          to="/enterprise"
          class="ms-1"
          color="medium-emphasis"
          variant="text"
          text="enterprise"
        />
      </template>

      <v-divider class="mx-2 my-auto" inset vertical style="height: 16px" />

      <theme-toggle></theme-toggle>

      <v-divider class="mx-2 my-auto" inset vertical style="height: 16px" />

      <app-bar-notifications-menu />

      <app-bar-language-menu v-if="smAndUp" />

      <app-settings-menu />
    </template>
  </v-app-bar>
</template>

<script setup>
import AppBarLanguageMenu from './LanguageMenu.vue'
import AppBarNotificationsMenu from './NotificationsMenu.vue'
import AppSettingsMenu from './SettingsMenu.vue'
import ThemeToggle from './ThemeToggle.vue'

import { useDisplay } from 'vuetify'

const { smAndUp, mdAndUp, mdAndDown } = useDisplay()
</script>
