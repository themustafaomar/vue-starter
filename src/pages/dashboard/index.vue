<template>
  <app-sheet title="Dashboard">
    <v-row no-gutters>
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

  <app-sheet class="mt-5">
    <template #header>
      <h3 class="font-weight-medium">Separate Section</h3>
    </template>

    <p class="text-grey-darken-1 mb-3" style="max-width: 700px">
      Hey! be sure that all steps are highlighted with green label otherwise you won't be able to
      submit your VRP .
    </p>
  </app-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'

const boxes = ref([
  { icon: 'account-lock-outline' },
  { icon: 'heart-multiple-outline' },
  { icon: 'code-braces' },
])
const loader = useLoader()

onMounted(() => {
  setTimeout(() => loader.markAsLoaded(), 1000)
})
</script>
