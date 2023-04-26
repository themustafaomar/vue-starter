<template>
  <AppDashboardHeading
    title="Dashboard"
    description="Welcome to dashboard, it's nice to see you again!"
  />

  <!-- grid system -->
  <v-row v-for="n in 1" :key="n" class="mt-2">
    <v-col v-for="n in 3" cols="4" :key="n">
      <v-sheet class="pa-5" rounded="lg">
        <h3 class="font-weight-regular text-h6 mb-2">This is the title number {{ n }}</h3>
        <p class="text-medium-emphasis">
          Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
          veniam vero sapiente, aperiam at!
        </p>
        <v-btn color="primary" elevation="0" rounded="pill" class="mt-4">
          Learn more
          <v-icon class="ms-1">mdi-arrow-right</v-icon>
        </v-btn>
      </v-sheet>
    </v-col>

    <!-- toasts (snackbars) -->
    <v-col>
      <v-sheet class="pa-5" rounded="lg">
        <h3 class="font-weight-regular text-h6 mb-2">
          This is to test
          <code>toasts</code>
        </h3>
        <p class="text-medium-emphasis">
          Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
          veniam vero sapiente, aperiam at!
        </p>
        <v-btn @click="showToast" color="primary" elevation="0" rounded="pill" class="mt-4">
          Show toast
          <v-icon class="ms-1">mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn @click="showErrorToast" color="red" elevation="0" rounded="pill" class="ms-3 mt-4">
          Show toast error
          <v-icon class="ms-1">mdi-bell-outline</v-icon>
        </v-btn>
      </v-sheet>
    </v-col>

    <!-- delete dialogs -->
    <v-col>
      <v-sheet class="pa-5" rounded="lg">
        <h3 class="font-weight-regular text-h6 mb-2">
          This is to test
          <code>dialogs</code>
        </h3>
        <p class="text-medium-emphasis">
          Lorem ipsum elit, placeat officiis nam ullam deleniti accusantium alias tempore velit
          veniam vero sapiente, aperiam at!
        </p>
        <v-btn @click.prevent color="primary" elevation="0" rounded="pill" class="mt-4">
          Show delete dialog
          <v-icon class="ms-1">mdi-delete-outline</v-icon>
        </v-btn>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import AppDashboardHeading from '@/components/dashboard/Heading.vue'
import { useStore } from 'vuex'

const store = useStore()

function showToast() {
  store.commit('app/notify', {
    message: 'It is working perfectly fine!',
    color: 'primary',
  })
}

function showErrorToast() {
  store.commit('app/notify', {
    message: 'This is a message for error toast.',
    color: 'red',
  })
}
</script>
