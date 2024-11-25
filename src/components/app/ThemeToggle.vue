<template>
  <v-btn
    @click="switchTheme"
    variant="text"
    color="medium-emphasis"
    icon
    class="text-capitalize px-3"
  >
    <v-icon :icon="icon" size="24" />
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import storage from '@/plugins/storage'

const { global } = useTheme()
const icon = computed(() =>
  global.name.value === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'
)

function switchTheme() {
  global.name.value = global.name.value === 'dark' ? 'light' : 'dark'
  storage.set('mode', global.name.value)
}
</script>
