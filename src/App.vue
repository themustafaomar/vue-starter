<template>
  <!-- Don't modify this unless you know what you're doing -->
  <!-- This applied to all pages of the app, no matter which layout you're using.. -->
  <RouterView />
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useTheme, useLocale } from 'vuetify'

const { state } = useStore()
const { current } = useLocale()
const theme = useTheme()

onBeforeMount(() => {
  theme.global.name.value = state.app.mode
  current.value = state.app.locale.current
})
</script>

<style lang="sass">
// Vuetify adds a scrollbar by default
// we don't do that here :]
html
  overflow-y: auto !important
</style>
