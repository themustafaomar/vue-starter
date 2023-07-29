<script setup>
import colorLib from '@kurkle/color'
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { LineChart, useLineChart } from 'vue-chart-3'
import { months } from '@/assets/js/charts/utils'
import { websitePerformanceWidget } from '@/data/charts'

const lineChartRef = ref()
const { current } = useTheme()
const data = computed(() => ({
  labels: months({ count: 24 }),
  datasets: [
    {
      data: websitePerformanceWidget,
      borderColor: current.value.colors.primary,
      tension: 0.05,
      fill: true,
      backgroundColor: () => {
        return createGradient(
          lineChartRef.value.canvasRef.getContext('2d'),
          [colorLib('#0094ff').alpha(0.1).rgbString(), colorLib('#0094ff').alpha(0).rgbString()],
          [0, 0, 0, 320]
        )
      },
    },
  ],
}))
const { lineChartProps } = useLineChart({
  chartData: data,
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

const createGradient = (ctx, stops, coords = [0, 50, 0, 300]) => {
  const gradient = ctx.createLinearGradient(...coords)

  gradient.addColorStop(0, stops[0])
  gradient.addColorStop(1, stops[1])

  return gradient
}
</script>

<template>
  <v-sheet rounded="lg" class="shadow-sm pa-5">
    <div class="d-flex align-center justify-space-between mb-2">
      <div>
        <h2 class="text-h6 font-weight-medium">Website Performance</h2>
        <p class="text-grey-darken-1 text-body-2">How has performened this month</p>
      </div>

      <v-btn icon variant="flat" density="compact">
        <v-icon class="text-medium-emphasis" size="22">mdi-information-slab-circle-outline</v-icon>
      </v-btn>
    </div>

    <v-row no-gutters class="mt-6">
      <v-col cols="7">
        <h5 class="text-grey-darken-2 font-weight-medium mb-2">Bounce Rate (AVG)</h5>
        <LineChart v-bind="lineChartProps" :height="45" />
      </v-col>

      <v-col cols="5" class="text-end">
        <h3>24.47%</h3>
        <p class="text-body-2 text-red">
          <v-icon>mdi-arrow-down</v-icon>
          6.5%
        </p>
        <p class="text-grey-darken-1 text-body-2">vs last month</p>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-5">
      <v-col cols="7">
        <h5 class="text-grey-darken-2 font-weight-medium mb-2">Page Views (AVG)</h5>
        <LineChart v-bind="lineChartProps" :height="45" />
      </v-col>

      <v-col cols="5" class="text-end">
        <h3>24.47%</h3>
        <p class="text-body-2 text-success">
          <v-icon>mdi-arrow-up</v-icon>
          17.5%
        </p>
        <p class="text-grey-darken-1 text-body-2">vs last month</p>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-5">
      <v-col cols="7">
        <h5 class="text-grey-darken-2 font-weight-medium mb-2">New Users (AVG)</h5>
        <LineChart v-bind="lineChartProps" :height="45" />
      </v-col>

      <v-col cols="5" class="text-end">
        <h3>10.55%</h3>
        <p class="text-body-2 text-success">
          <v-icon>mdi-arrow-up</v-icon>
          14.14%
        </p>
        <p class="text-grey-darken-1 text-body-2">vs last month</p>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-5">
      <v-col cols="7">
        <h5 class="text-grey-darken-2 font-weight-medium mb-2">Time On Site (AVG)</h5>
        <LineChart v-bind="lineChartProps" :height="45" />
      </v-col>

      <v-col cols="5" class="text-end">
        <h3>5.00%</h3>
        <p class="text-body-2 text-red">
          <v-icon>mdi-arrow-down</v-icon>
          6.14%
        </p>
        <p class="text-grey-darken-1 text-body-2">vs last month</p>
      </v-col>
    </v-row>
  </v-sheet>
</template>
