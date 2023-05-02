<template>
  <v-menu
    key="language-menu"
    close-delay="100"
    location="bottom end"
    open-delay="60"
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
      <app-list :items="locales" @click:select="changeLocale" nav />
    </v-sheet>
  </v-menu>
</template>

<script setup>
import { useLocale } from 'vuetify'
import AppList from '@/components/app/List.vue'
import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

const locales = [
  { title: 'Translations', type: 'subheader' },
  {
    title: 'English',
    value: 'en',
  },
  {
    title: 'Arabic',
    value: 'ar',
  },
]

const { current } = useLocale()

function changeLocale(event) {
  current.value = event.id
}
</script>
