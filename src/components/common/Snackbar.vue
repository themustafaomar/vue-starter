<template>
  <v-snackbar
    :color="options.color"
    v-model="options.show"
    :timeout="options.timeout"
    :location="options.location"
  >
    {{ options.message }}

    <template #actions>
      <v-btn color="white" variant="text" @click="store.state.app.snackbar.show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const options = computed(() => store.state.app.snackbar)
</script>
