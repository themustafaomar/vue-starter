<template>
  <app-sheet title="Dashboard" class="mb-0">
    <v-row no-gutters>
      <v-col cols="12" sm="6" lg="3">
        <widgets-stat
          title="Today Orders"
          value="1,900"
          percentage="25.47%"
          class="pe-5 ps-0 py-0"
          :positive="false"
        />
      </v-col>

      <v-divider vertical />

      <v-col cols="12" sm="6" lg="3">
        <widgets-stat title="Today Orders" value="2,500" percentage="5.64%" class="px-5 py-0" />
      </v-col>

      <v-divider vertical />

      <v-col cols="12" sm="6" lg="3">
        <widgets-stat
          title="Today Orders"
          value="564"
          percentage="14.47%"
          class="px-5 py-0"
          :positive="false"
        />
      </v-col>

      <v-divider vertical />

      <v-col cols="12" sm="6" lg="3">
        <widgets-stat
          title="Today Orders"
          value="1,000"
          percentage="9.14%"
          class="ps-5 pe-0 py-0"
        />
      </v-col>
    </v-row>

    <v-row no-gutters class="d-none">
      <v-col cols="12" md="3" xl="3">
        <div rounded="lg" class="d-flex">
          <v-sheet
            color="dark"
            width="62"
            height="62"
            rounded="pill"
            class="d-flex align-center justify-center flex-shrink-0 shadow-md bg-blue mt-1"
          >
            <v-icon size="35" color="white">mdi-account-multiple-outline</v-icon>
          </v-sheet>
          <div class="ms-3">
            <h3 class="font-weight-regular text-h6">Total stat..</h3>
            <p class="text-medium-emphasis">Total stat.. something.</p>
            <h2>0</h2>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="3" xl="3">
        <div rounded="lg" class="d-flex">
          <v-sheet
            color="red"
            width="62"
            height="62"
            rounded="pill"
            class="d-flex align-center justify-center flex-shrink-0 shadow-md mt-1"
          >
            <v-icon size="35" color="white">mdi-code-braces</v-icon>
          </v-sheet>
          <div class="ms-3">
            <h3 class="font-weight-regular text-h6">Total stats..</h3>
            <p class="text-medium-emphasis">Total stats.. something.</p>
            <h2>0</h2>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="3" xl="3">
        <div rounded="lg" class="d-flex">
          <v-sheet
            color="dark"
            width="62"
            height="62"
            rounded="pill"
            class="d-flex align-center justify-center flex-shrink-0 shadow-md bg-cyan mt-1"
          >
            <v-icon size="35" color="white">mdi-heart-multiple-outline</v-icon>
          </v-sheet>
          <div class="ms-3">
            <h3 class="font-weight-regular text-h6">Total stats..</h3>
            <p class="text-medium-emphasis">Total stats.. something.</p>
            <h2>0</h2>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="3" xl="3">
        <div rounded="lg" class="d-flex">
          <v-sheet
            color="dark"
            width="62"
            height="62"
            rounded="pill"
            class="d-flex align-center justify-center flex-shrink-0 shadow-md bg-green mt-1"
          >
            <v-icon size="35" color="white">mdi-map-marker-radius-outline</v-icon>
          </v-sheet>
          <!-- prettier-ignore -->
          <div class="ms-3">
              <h3 class="font-weight-regular text-h6">Total stats..</h3>
              <p class="text-medium-emphasis">The Total stats.. something.</p>
              <h2>0</h2>
            </div>
        </div>
      </v-col>
    </v-row>
  </app-sheet>

  <v-row class="mt-3">
    <v-col cols="16" lg="6">
      <v-row>
        <v-col cols="12">
          <widgets-sales-revenue />
        </v-col>

        <!-- Second widget -->
        <v-col cols="12" lg="6">
          <widgets-bar-simple title="Active Subscriptions" value="1.1K" percentage="25.47%" />
        </v-col>

        <!-- Third widget -->
        <v-col cols="12" lg="6">
          <widgets-bar-simple title="AVG Subscriptions" value="341.2" percentage="10%" />
        </v-col>

        <v-col cols="6">
          <widgets-website-performance />
        </v-col>

        <v-col cols="6">
          <widgets-pie />
        </v-col>

        <!-- Fourth widget -->
        <!-- <v-col cols="12" lg="6">
          <v-sheet rounded="lg" class="position-relative shadow-sm pa-5">
            <div class="d-flex align-center justify-space-between">
              <div>
                <h2 class="text-h6 font-weight-medium">Investment Overview</h2>
                <p class="text-grey-darken-1 text-body-2">
                  The investment overview of your platform
                  <a href="#" class="text-primary text-decoration-none">See all</a>
                </p>
              </div>

              <v-btn icon variant="flat" density="compact">
                <v-icon class="text-medium-emphasis" size="22">
                  mdi-information-slab-circle-outline
                </v-icon>
              </v-btn>
            </div>

            <v-tabs v-model="tabs" color="primary" :ripple="false" density="compact" class="mt-5">
              <v-tab :value="1">
                <h4 class="text-capitalize font-weight-medium">Overview</h4>
              </v-tab>

              <v-tab :value="2">
                <h4 class="text-capitalize font-weight-medium">This Year</h4>
              </v-tab>

              <v-tab :value="3">
                <h4 class="text-capitalize font-weight-medium">All Time</h4>
              </v-tab>
            </v-tabs>

            <v-divider style="height: 2px"></v-divider>

            <p class="text-grey-darken-1 mt-5">Currently Actived Investment</p>
          </v-sheet>
        </v-col> -->
      </v-row>
    </v-col>

    <!-- The other side -->
    <v-col cols="12" lg="6">
      <v-sheet rounded="lg" class="shadow-sm pa-5">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h2 class="text-h5 font-weight-medium">Active Users</h2>
            <p class="text-grey-darken-1">How do your users visited in the tim</p>
          </div>

          <div>
            <v-btn icon variant="flat" density="compact">
              <v-icon class="text-medium-emphasis" size="22">
                mdi-information-slab-circle-outline
              </v-icon>
            </v-btn>
          </div>
        </div>

        <div class="d-xflex text-center mt-5 d-none">
          <div class="flex-grow-1">
            <h4 class="font-weight-medium">Monthly</h4>
            <h3 class="font-weight-medium">1.42K</h3>
            <div class="text-body-2 text-success">
              <v-icon>mdi-arrow-up</v-icon>
              3.65%
            </div>
          </div>

          <div class="flex-grow-1">
            <h4 class="font-weight-medium">Weekly</h4>
            <h3 class="font-weight-medium">0.847K</h3>
            <div class="text-body-2 text-red">
              <v-icon>mdi-arrow-down</v-icon>
              10.65%
            </div>
          </div>

          <div class="flex-grow-1">
            <h4 class="font-weight-medium">Monthly</h4>
            <h3 class="font-weight-medium">0.16K</h3>
            <div class="text-body-2 text-success">
              <v-icon>mdi-arrow-up</v-icon>
              9.65%
            </div>
          </div>
        </div>

        <div class="mt-8">
          <LineChart class="active-users-chart" v-bind="lineChartProps" />
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import colorLib from '@kurkle/color'
import { Chart, registerables } from 'chart.js'
import { LineChart, useLineChart } from 'vue-chart-3'
import { useUser } from '@/composables/useUser'
import { useLoader } from '@/composables/useLoader'
import { months, numbers, createGradient } from '@/assets/js/charts/utils'
import WidgetsSalesRevenue from '@/components/dashboard/widgets/SalesRevenue.vue'
import WidgetsBarSimple from '@/components/dashboard/widgets/BarSimple.vue'
import WidgetsWebsitePerformance from '@/components/dashboard/widgets/WebsitePerformance.vue'
import WidgetsStat from '@/components/dashboard/widgets/Stat.vue'
import WidgetsPie from '@/components/dashboard/widgets/Pie.vue'

Chart.register(...registerables)

const tabs = ref(null)
const loader = useLoader()
const user = useUser()
const { current, global, styles, computedThemes } = useTheme()

const testData = computed(() => ({
  labels: months({ count: 12 }),
  datasets: [
    {
      data: [
        33.64026063, 55.40552126, 2.99382716, 70.23233882, 47.24451303, 98.22788066, 5.89849108,
        82.60202332, 48.09156379, 73.97205075, 94.81138546, 85.91820988,
      ],
      borderColor: current.value.colors.primary,
      fill: false,
      tension: 0.3,
      backgroundColor: () => {
        return createGradient(
          lineChartRef.value.canvasRef.getContext('2d'),
          [
            colorLib(current.value.colors.primary).alpha(0.25).rgbString(),
            colorLib(current.value.colors.primary).alpha(0).rgbString(),
          ],
          [0, 0, 0, 200]
        )
      },
    },
    {
      data: [
        60.3223594, 91.34687929, 3.75, 24.69221536, 77.6303155, 60.09516461, 88.1361454, 7.43227023,
        71.06995885, 83.98748285, 14.08607682, 70.00771605,
      ],
      borderColor: global.current.value.colors.warning,
      fill: false,
      tension: 0.3,
      // backgroundColor: () => {
      //   return createGradient(
      //     lineChartRef.value.canvasRef.getContext('2d'),
      //     [
      //       colorLib(current.value.colors.primary).alpha(0.25).rgbString(),
      //       colorLib(current.value.colors.primary).alpha(0).rgbString(),
      //     ],
      //     [0, 0, 0, 200]
      //   )
      // },
    },
  ],
}))
const { lineChartProps, lineChartRef } = useLineChart({
  chartData: testData,
  options: {
    // layout: {
    //   padding: 20,
    // },
    // This type of charts holds a lot of data, so for performance reasons, It would be wise if we disable animations
    // https://www.chartjs.org/docs/latest/general/performance.html#disable-animations
    animation: { duration: 0 },
    hover: { animationDuration: 0 },
    responsiveAnimationDuration: 0,
    // responsive: false,
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
        // display: false,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#93979f',
        },
      },

      // XAxes
      y: {
        // display: false,
        border: {
          display: false,
        },
        grid: {
          color: '#eee',
        },
        ticks: {
          color: '#93979f',
          stepSize: 20,
        },
      },
    },
  },
})

onMounted(() => {
  loader.markAsLoaded()
})
</script>

<style>
.active-users-chart canvas {
  width: 100% !important;
  height: 240px !important;
}
</style>
