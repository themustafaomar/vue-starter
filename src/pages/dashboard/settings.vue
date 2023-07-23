<template>
  <app-sheet title="Account Settings">
    <h3 class="mb-3">Notifications</h3>

    <v-sheet class="d-flex justify-space-between align-center border-b pb-3 mb-3">
      <div>
        <h3 class="font-weight-medium">Enable Desktop Notifications</h3>
        <p>Receive notification all of the messages, contracts, documents.</p>
      </div>
      <v-switch hide-details inset color="primary" class="d-flex justify-end"></v-switch>
    </v-sheet>

    <v-sheet class="d-flex justify-space-between align-center border-b pb-3 mb-3">
      <div>
        <h3 class="font-weight-medium">Enable Unread Notification Badge</h3>
        <p>Receive notification all of the messages, contracts, documents.</p>
      </div>
      <v-switch hide-details inset color="primary" class="d-flex justify-end"></v-switch>
    </v-sheet>

    <v-sheet class="d-flex justify-space-between align-center">
      <div>
        <h3 class="font-weight-medium">Enable Unread Notification</h3>
        <p>Receive notification all of the messages, contracts, documents.</p>
      </div>
      <v-switch hide-details inset color="primary" class="d-flex justify-end"></v-switch>
    </v-sheet>

    <v-divider class="mx-n6 my-6"></v-divider>

    <h3 class="mb-3">Email Notifications</h3>

    <v-sheet class="d-flex justify-space-between align-center border-b pb-3 mb-3">
      <div>
        <h3 class="font-weight-medium">Communication Emails</h3>
        <p>Receive email for messages, contracts, documents.</p>
      </div>
      <v-switch hide-details inset color="primary" class="d-flex justify-end"></v-switch>
    </v-sheet>

    <v-sheet class="d-flex justify-space-between align-center">
      <div>
        <h3 class="font-weight-medium">Announcements &amp; Updates</h3>
        <p>Receive email about product updates, improvments etc..</p>
      </div>
      <v-switch hide-details inset color="primary" class="d-flex justify-end"></v-switch>
    </v-sheet>
  </app-sheet>
  <!-- <app-sheet title="Account Settings">
    <p class="font-weight-medium">
      <v-icon class="me-1">mdi-check-circle-outline</v-icon>
      Hey! I'm working very hard on settings and other modules, and it will be available soon, stay
      tunned!
    </p>
  </app-sheet> -->
</template>

<script setup>
import { onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'

const loader = useLoader()

onMounted(() => {
  loader.markAsLoaded()
})
</script>
