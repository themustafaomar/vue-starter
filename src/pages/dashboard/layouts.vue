<template>
  <app-dashboard-heading
    title="Layouts"
    description="This page demonstrates the current layouts."
  />

  <v-sheet class="pa-5 mt-5" rounded="lg">
    <h2 class="font-weight-medium text-h5">Subsection</h2>
    <p class="text-medium-emphasis mb-3">
      Hi! this is a subsection, I created this description just for demonstration purposes
    </p>
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
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import AppDashboardHeading from '@/components/dashboard/Heading.vue'

const { state } = useStore()

onMounted(() => {
  setTimeout(() => (state.app.isLoading = false), 1000)
})
</script>
