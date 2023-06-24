<template>
  <v-sheet rounded="lg" class="pa-5">
    <div class="d-flex align-center justify-space-between">
      <div>
        <h2 class="font-weight-medium text-h5">Dashboard</h2>
        <p class="text-medium-emphasis mb-3">Welcome to dashboard, it's nice to see you again!</p>
      </div>
      <v-btn v-if="is('super-admin') || is('admin')" color="primary" elevation="0">
        Take action
      </v-btn>
    </div>

    <v-divider />

    <!-- grid system -->
    <v-row class="mt-3">
      <v-col v-for="(box, index) in boxes" :key="index" cols="12" md="4" xl="4">
        <v-sheet rounded="lg" class="d-flex align-center">
          <v-icon size="50">mdi-{{ box.icon }}</v-icon>
          <div class="ms-3">
            <h3 class="font-weight-regular text-h6 mb-1">Grid system box {{ index + 1 }}</h3>
            <p class="text-medium-emphasis">
              Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
              veniam vero sapiente, aperiam at!
            </p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet v-if="is('super-admin') || is('admin')" rounded="lg" class="pa-5 mt-5">
    <h2 class="font-weight-medium text-h5">Admin section</h2>
    <p class="text-medium-emphasis mb-3">
      Hi! this is a subsection, I created this description just for demonstration purposes
    </p>

    <v-divider />

    <!-- grid system -->
    <v-row class="mt-3">
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
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'

const boxes = ref([
  { icon: 'account-lock-outline' },
  { icon: 'heart-multiple-outline' },
  { icon: 'code-braces' },
])
const loader = useLoader()

onMounted(() => {
  setTimeout(() => loader.markAsLoaded(), 1000)
})
</script>
