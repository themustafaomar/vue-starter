<template>
  <app-btn :icon="icon" color="medium-emphasis" path="theme" @click="onClick" />
</template>

<script setup>
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()
const icon = computed(() =>
  theme.global.name.value === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'
)

function onClick() {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}
</script>
