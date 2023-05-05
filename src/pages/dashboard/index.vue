<template>
  <app-dashboard-heading
    title="Dashboard"
    description="Welcome to dashboard, it's nice to see you again!"
  />

  <!-- grid system -->
  <v-row v-for="n in 2" :key="n" class="mt-2">
    <v-col v-for="n in 3" :key="n" cols="4">
      <v-sheet rounded="lg" class="pa-5">
        <h3 class="font-weight-regular text-h6 mb-2">Grid system box {{ n }}</h3>
        <p class="text-medium-emphasis">
          Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
          veniam vero sapiente, aperiam at!
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import AppDashboardHeading from '@/components/dashboard/Heading.vue'

const store = useStore()

onMounted(() => {
  store.commit('app/loaded')
})
</script>
