<script setup>
import { computed } from 'vue'
import { LineChart, useLineChart } from 'vue-chart-3'
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
  labels: months({ count: 12 }),
  datasets: [
    {
      data: [
        24.27640604, 94.39557613, 2.68347051, 50.37465706, 79.44444444, 17.05332647, 86.65809328,
        85.78960905, 30.49725652, 66.46004801, 46.76440329, 76.34859396,
      ],
      borderColor: '#517bf3',
      labels: months({ count: 12 }),
      tension: 0.5,
    },
  ],
}))
const { lineChartProps: lineChartProps1 } = useLineChart({
  chartData,
  options: {
    // This type of charts holds a lot of data, so for performance reasons, It would be wise if we disable animations
    // https://www.chartjs.org/docs/latest/general/performance.html#disable-animations
    animation: { duration: 0 },
    hover: { animationDuration: 0 },
    responsiveAnimationDuration: 0,
    responsive: false,
    // maintainAspectRatio: false,
    // aspectRatio: 3.5,

    plugins: {
      legend: {
        display: false,
      },
    },

    // Elements
    elements: {
      line: {
        borderWidth: 1.5,
      },
      point: {
        radius: 0,
      },
    },

    // Scales
    scales: {
      // YAxes
      x: {
        display: false,
      },

      // XAxes
      y: {
        display: false,
      },
    },
  },
})
</script>

<template>
  <v-sheet rounded="lg" class="pa-5">
    <v-row no-gutters class="d-flex align-center">
      <v-col cols="7">
        <h3 class="font-weight-medium mb-1">{{ title }}</h3>

        <h2 class="font-weight-medium my-2">{{ value }}</h2>

        <div class="d-flex align-center">
          <p class="text-body-2" :class="positive ? 'text-success' : 'text-red'">
            <v-icon>mdi-arrow-{{ positive ? 'up' : 'down' }}</v-icon>
            {{ percentage }}
          </p>
          <span class="text-body-2 text-grey-darken-1 ms-2">vs last week</span>
        </div>
      </v-col>

      <v-col cols="5">
        <LineChart v-bind="lineChartProps1" :height="60" :width="150" />
      </v-col>
    </v-row>
  </v-sheet>
</template>
