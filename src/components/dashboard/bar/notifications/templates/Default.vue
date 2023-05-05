<template>
  <v-list-item-title class="text-wrap font-weight-medium text-h7 mb-1">
    {{ notification.data.title }}
  </v-list-item-title>

  <div class="text-body-2">
    <p class="mb-1">{{ notification.data.description.slice(0, 75) }}</p>

    <p
      class="text-decoration-none font-weight-medium d-block"
      :class="!notification.read_at ? 'text-blue-accent-4' : 'text-gray'"
    >
      {{ notification.created }}
    </p>
  </div>
</template>

<script setup>
defineProps({ notification: Object })
</script>
