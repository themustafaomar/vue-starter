<template>
  <v-menu
    close-delay="100"
    location="bottom end"
    open-delay="60"
    key="language-menu"
    :close-on-content-click="false"
    :open-on-hover="false"
  >
    <template #activator="{ props }">
      <app-tooltip-btn
        v-bind="props"
        color="medium-emphasis"
        icon="mdi-translate"
        path="languages"
      ></app-tooltip-btn>
    </template>

    <v-sheet class="overflow-hidden" border rounded>
      <app-list @click:select="changeLocale" nav :items="locales" />
    </v-sheet>
  </v-menu>
</template>

<script setup>
import AppList from '@/components/common/List.vue'
import { useLocale } from 'vuetify'

const locales = [
  { title: 'Translations', type: 'subheader' },
  {
    title: 'English',
    // to: route.fullPath.replace(/^\/[a-zA-Z-]+/, `/${locale}`),
    value: 'en',
  },
  {
    title: 'Arabic',
    // to: route.fullPath.replace(/^\/[a-zA-Z-]+/, `/${locale}`),
    value: 'ar',
  },
]

const { current } = useLocale()

function changeLocale(event) {
  current.value = event.id
}
</script>
