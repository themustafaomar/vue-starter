<template>
  <app-sheet title="Layouts">
    <v-row>
      <v-col v-for="n in 3" :key="n" cols="12" md="4" xl="4">
        <v-sheet rounded="lg">
          <h3 class="font-weight-regular text-h6 mb-2">Grid system box {{ n }}</h3>
          <p class="text-medium-emphasis">
            Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
            veniam vero sapiente, aperiam at!
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </app-sheet>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'

const loader = useLoader()

onMounted(() => {
  setTimeout(() => loader.markAsLoaded(), 1000)
})
</script>
