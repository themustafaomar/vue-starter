<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card rounded="lg" class="pa-2">
      <v-card-title v-if="!$slots.title">
        <h3 class="font-weight-regular text-h6">{{ title }}</h3>
      </v-card-title>
      <slot v-else name="title">No title set</slot>

      <v-card-text v-if="!$slots.default">
        <p class="text-medium-emphasis mx-n2">{{ content }}</p>
      </v-card-text>
      <div class="mx-n1">
        <slot></slot>
      </div>

      <v-card-actions>
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

  if (typeof payload.value !== 'undefined') {
    payload.value = data
  }
}

function hide() {
  dialog.value = false
}

defineProps({ title: String, content: String })
defineExpose({ show, hide, dialog })
</script>
