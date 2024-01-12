<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'

const { current } = useTheme()
const chartData = computed(() => {
  return {
    labels: ['Finished', 'Processing', 'Canceled'],
    datasets: [
      {
        label: 'Total',
        data: [60, 25, 15],
        backgroundColor: [
          current.value.colors.primary,
          current.value.colors.warning,
          current.value.colors.error,
        ],
        borderRadius: 6,
        hoverOffset: 10,
        hoverBorderColor: 'transparent',
      },
    ],
  }
})
const { doughnutChartProps } = useDoughnutChart({
  chartData,
  options: {
    responsive: true,
    cutout: 70,

    // Plugins
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#2d3748',
          padding: 15,
          font: {
            size: 14,
            family: 'Inter',
          },
          boxHeight: 12,
          usePointStyle: true,
        },
      },
    },
  },
})
</script>

<template>
  <v-sheet rounded="lg" class="shadow-sm pa-5">
    <div class="d-flex align-center justify-space-between mb-5">
      <div>
        <h2 class="text-h6 font-weight-medium mb-0">Order Statistics</h2>
        <p class="text-grey-darken-1 text-body-2">How has performened this month</p>
      </div>

      <!-- <v-btn icon variant="flat" density="compact">
        <v-icon class="text-medium-emphasis" size="22">mdi-information-slab-circle-outline</v-icon>
      </v-btn> -->
    </div>

    <DoughnutChart
      v-bind="doughnutChartProps"
      class="mx-auto"
      style="height: 275px; width: 275px"
    />
  </v-sheet>
</template>
