<template>
  <!-- Don't modify this unless you know what you're doing -->
  <!-- This applied to all pages of the app, no matter which layout you're using.. -->
  <RouterView />
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useTheme } from 'vuetify'

const store = useStore()
const theme = useTheme()

onBeforeMount(() => {
  theme.global.name.value = store.state.app.mode
})
</script>
