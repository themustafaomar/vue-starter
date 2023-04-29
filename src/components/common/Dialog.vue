<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card rounded="lg">
      <v-card-title v-if="!$slots.title" class="border-b">
        <h3 class="font-weight-regular text-h6 mb-2">
          {{ title || 'Are you sure you want to apply this action?' }}
        </h3>
      </v-card-title>
      <slot v-else name="title">No title set</slot>

      <v-card-text v-if="!$slots.message">
        <p class="text-medium-emphasis">
          {{ message }}
        </p>
      </v-card-text>
      <slot v-else></slot>

      <v-card-actions class="px-4 pb-4">
        <template v-if="!$slots.actions">
          <v-btn color="red" @click="dialog = false">Close</v-btn>
        </template>
        <slot v-else name="actions" v-bind="{ close: () => (dialog = false), payload }"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const payload = ref(null)

function show(data) {
  dialog.value = true

  if (typeof payload !== 'undefined') {
    payload.value = data
  }
}

function hide() {
  dialog.value = false
}

defineProps({ title: String, message: String })
defineExpose({ show, hide, dialog })
</script>
