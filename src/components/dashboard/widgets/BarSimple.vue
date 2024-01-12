<script setup>
import { computed } from 'vue'
import { BarChart, useBarChart } from 'vue-chart-3'
import { months } from '@/assets/js/charts/utils'

defineProps({
  title: String,
  value: [String, Number],
  percentage: String,
  positive: {
    type: Boolean,
    default: true,
  },
})

const chartData = computed(() => ({
  labels: months({ count: 8 }),
  datasets: [
    {
      label: 'Sales',
      data: [
        7.34910837, 54.42301097, 12.50514403, 86.53377915, 44.41015089, 94.77623457, 31.45919067,
        44.58247599,
      ],
      backgroundColor: ['rgba(0, 148, 255, 0.15)', 'rgba(0, 148, 255, 1)'],
      barPercentage: 0.7,
      maxBarThickness: 10,
    },
  ],
}))
const { barChartProps } = useBarChart({
  chartData,
  options: {
    responsive: true,
    aspectRatio: 3.5,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  },
})
</script>

<template>
  <v-sheet rounded="lg" class="position-relative shadow-sm pa-5">
    <div class="d-flex justify-space-between mb-2">
      <div>
        <h2 class="text-h6 font-weight-medium">{{ title }}</h2>
        <p class="text-grey-darken-1">In last 30 days</p>
      </div>

      <v-btn icon variant="flat" density="compact">
        <v-icon class="text-medium-emphasis" size="22">mdi-information-slab-circle-outline</v-icon>
      </v-btn>
    </div>

    <h2 class="font-weight-medium">{{ value }}</h2>

    <v-row no-gutters class="align-center">
      <v-col cols="8">
        <div class="d-flex align-center text-body-2 mt-2">
          <p class="text-nowrap" :class="positive ? 'text-success' : 'text-red'">
            <v-icon>mdi-arrow-{{ positive ? 'up' : 'down' }}</v-icon>
            {{ percentage }}
          </p>
          <span class="text-body-2 text-grey-darken-1 ms-2">since last month</span>
        </div>
      </v-col>

      <v-col cols="4">
        <BarChart v-bind="barChartProps" />
      </v-col>
    </v-row>
  </v-sheet>
</template>
