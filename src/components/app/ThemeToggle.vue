<template>
  <app-btn :icon="icon" color="medium-emphasis" path="theme" @click="onClick" />
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import AppBtn from './Btn.vue'
import storage from '@/plugins/storage'

const theme = useTheme()
const icon = computed(() =>
  theme.global.name.value === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'
)

function onClick() {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
  storage.set('mode', theme.global.name.value)
}
</script>
