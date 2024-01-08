<template>
  <app-sheet title="Widgets" class="mb-0">Welcome to the widgets section</app-sheet>

  <v-row class="mt-3">
    <v-col cols="6">
      <widgets-sales-revenue />
    </v-col>

    <v-col cols="3">
      <widgets-bar-simple title="Active Subscriptions" value="1.1K" percentage="25.47%" />
    </v-col>

    <v-col cols="3">
      <widgets-stat title="Today Orders" value="1,900" percentage="25.47%" />
    </v-col>

    <v-col cols="3">
      <widgets-website-performance />
    </v-col>

    <v-col cols="3">
      <widgets-pie />
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useLoader } from '@/composables/useLoader'
import WidgetsWebsitePerformance from '@/components/dashboard/widgets/WebsitePerformance.vue'
import WidgetsBarSimple from '@/components/dashboard/widgets/BarSimple.vue'
import WidgetsSalesRevenue from '@/components/dashboard/widgets/SalesRevenue.vue'
import WidgetsStat from '@/components/dashboard/widgets/Stat.vue'
import WidgetsPie from '@/components/dashboard/widgets/Pie.vue'

Chart.register(...registerables)

const loader = useLoader()

onMounted(() => {
  loader.markAsLoaded()
})
</script>
