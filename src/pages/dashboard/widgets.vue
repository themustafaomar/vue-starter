<template>
  <app-sheet title="Widgets" class="mb-0">Welcome to the widgets section</app-sheet>

  <v-row class="mt-3">
    <v-col cols="3">
      <app-dashboard-widgets-website-performance />
    </v-col>

    <v-col cols="9">
      <v-row>
        <v-col cols="8">
          <app-dashboard-widgets-sales-revenue />
        </v-col>

        <v-col cols="4">
          <app-dashboard-widgets-bar-simple
            title="Active Subscriptions"
            value="1.1K"
            percentage="25.47%"
          />
        </v-col>

        <v-col cols="4">
          <app-dashboard-widgets-stat title="Today Orders" value="1,900" percentage="25.47%" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useLoader } from '@/composables/useLoader'
import AppDashboardWidgetsWebsitePerformance from '@/components/dashboard/widgets/WebsitePerformance.vue'
import AppDashboardWidgetsBarSimple from '@/components/dashboard/widgets/BarSimple.vue'
import AppDashboardWidgetsSalesRevenue from '@/components/dashboard/widgets/SalesRevenue.vue'
import AppDashboardWidgetsStat from '@/components/dashboard/widgets/Stat.vue'

Chart.register(...registerables)

const loader = useLoader()

onMounted(() => {
  loader.markAsLoaded()
})
</script>
