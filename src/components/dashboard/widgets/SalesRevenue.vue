<script setup>
import { ref, computed } from 'vue'
import { BarChart, useBarChart } from 'vue-chart-3'
import { months } from '@/assets/js/charts/utils'

const data = computed(() => ({
  labels: months({ count: 12 }),
  datasets: [
    {
      label: 'Sales',
      data: [
        4.32441701, 36.5835048, 90.96193416, 39.06464335, 15.45953361, 95.45524691, 39.54561043,
        4.5207476, 21.24485597, 39.10065158, 37.10048011, 1.66409465,
      ],
      backgroundColor: ['rgba(0, 148, 255, 0.15)', 'rgba(0, 148, 255, 1)'],
      barPercentage: 0.7,
      // barThickness: 3, // Width
      maxBarThickness: 10,
      // minBarLength: 2,
      // borderWidth: 1
    },
  ],
}))
const { barChartProps } = useBarChart({
  chartData: data,
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
        // grid: {
        //   display: false,
        // }
      },
      y: {
        display: false,
        beginAtZero: true,
        // grid: {
        //   display: false
        // }
      },
    },
  },
})
</script>

<template>
  <v-sheet rounded="lg" class="position-relative shadow-sm pa-5">
    <div class="d-flex justify-space-between">
      <div>
        <h2 class="text-h5 font-weight-medium">Sales Revenue</h2>
        <p class="text-grey-darken-1">In last 30 days revenue from subscription</p>
      </div>

      <v-btn icon variant="flat" density="compact">
        <v-icon class="text-medium-emphasis" size="22">mdi-information-slab-circle-outline</v-icon>
      </v-btn>
    </div>

    <v-row no-gutters>
      <v-col cols="12" lg="7">
        <div class="d-flex align-center">
          <div>
            <div class="d-flex align-center mt-5">
              <h2 class="font-weight-medium">9,346.20</h2>
              <div class="text-body-2 text-red ms-2">
                <v-icon>mdi-arrow-down</v-icon>
                16.93%
              </div>
            </div>
            <p class="text-grey-darken-1 text-body-2">This Month</p>
          </div>

          <div class="ms-8">
            <div class="d-flex align-center mt-5">
              <h2 class="font-weight-medium">3,541.16</h2>
              <div class="text-body-2 text-success ms-2">
                <v-icon>mdi-arrow-up</v-icon>
                10.93%
              </div>
            </div>
            <p class="text-grey-darken-1 text-body-2">This Week</p>
          </div>
        </div>
      </v-col>

      <v-col cols="12" lg="5">
        <div class="mx-auto me-lg-0 ms-lg-auto mt-5 mt-lg-0 ms-lg-0" style="width: 250px">
          <BarChart v-bind="barChartProps" />
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>
