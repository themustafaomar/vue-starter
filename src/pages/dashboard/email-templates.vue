<template>
  <app-sheet title="Email Templates">
    <h4 class="font-weight-medium text-uppercase mb-5">Templates - Simple email template</h4>

    <v-sheet color="grey-lighten-5" class="pa-10">
      <v-img class="mx-auto mb-4" src="/logo2.jpg" width="150" alt="Logo" />
      <h4 class="font-weight-medium text-center">
        Creative Vuetify starter for a better development.
      </h4>
      <v-sheet color="#fff" max-width="750" class="mx-auto pa-6 mt-5">
        <h3 class="mb-4">Hello User,</h3>
        <p class="mb-4">
          Let's face it, sometimes you have a simple message that doesn’t need much design—but still
          needs flexibility and reliability. Select a basic email template. Write your message. Then
          send with confidence.
        </p>
        <p class="mb-4">
          Its clean, minimal and pre-designed email template that is suitable for multiple purposes
          email template.
        </p>
        <p class="mb-4">
          Hope you'll enjoy the experience, we're here if you have any questions, drop us a line at
          info@yourwebsite.com anytime.
        </p>
        <p>―</p>
        <p>Regards</p>
        <p>Mustafa Omar</p>
      </v-sheet>
      <p class="mx-auto text-center text-grey-darken-3 mt-5">
        Copyright © 2020 VuetifyStarter. All rights reserved.
        <br />
        Template Made By Mustafa Omar.
      </p>
      <div class="text-center mt-5">
        <v-btn
          href="https://google.com"
          target="_blank"
          density="comfortable"
          elevation="0"
          icon
          color="grey-lighten-3"
          class="mx-2"
        >
          <v-icon size="20">mdi-facebook</v-icon>
        </v-btn>
        <v-btn
          href="https://google.com"
          target="_blank"
          density="comfortable"
          elevation="0"
          icon
          color="grey-lighten-3"
          class="mx-2"
        >
          <v-icon size="20">mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          href="https://google.com"
          target="_blank"
          density="comfortable"
          elevation="0"
          icon
          color="grey-lighten-3"
          class="mx-2"
        >
          <v-icon size="20">mdi-linkedin</v-icon>
        </v-btn>
        <v-btn
          href="https://google.com"
          target="_blank"
          density="comfortable"
          elevation="0"
          icon
          color="grey-lighten-3"
          class="mx-2"
        >
          <v-icon size="20">mdi-youtube</v-icon>
        </v-btn>
      </div>
      <p class="mx-auto text-center text-grey-darken-2 mt-5">
        This email was sent to you as a registered member of
        <a href="#">vuetifystarter.tld</a>
        <br />
        To update your emails preferences
        <a href="#">click here</a>
        .
      </p>
    </v-sheet>

    <h4 class="font-weight-medium text-uppercase my-5">Templates - Confirmation email template</h4>

    <v-sheet color="grey-lighten-5" class="pa-10">
      <v-img class="mx-auto mb-4" src="/logo2.jpg" width="150" alt="Logo" />
      <h4 class="font-weight-medium text-center">
        Creative Vuetify starter for a better development.
      </h4>
      <v-sheet color="#fff" max-width="750" class="mx-auto pa-6 mt-5">
        <h3 class="mb-4">Confirm Your E-Mail Address</h3>
        <p class="mb-4">Hi Mustafa,</p>
        <p class="mb-4">
          Welcome! You are receiving this email because you have registered on our site.
        </p>
        <p class="mb-4">Click the link below to active your Starter account.</p>
        <p class="mb-4">This link will expire in 15 minutes and can only be used once.</p>
        <v-btn color="primary" text="Verify email"></v-btn>
        <p class="mt-5">
          If the button above does not work, paste this link into your web browser:
        </p>
        <a href="#" class="d-inline-block my-2">
          https://themustafaomar.com/endpoint/to/auth?token=dfdsa5fwdfsaf21dsf575fw15rfe4r51wcsa1d2sd74sad54sa5d
        </a>
        <p>―</p>
        <p>Regards</p>
        <p>Mustafa Omar</p>
      </v-sheet>
      <p class="mx-auto text-center text-grey-darken-3 mt-5">
        Copyright © 2020 VuetifyStarter. All rights reserved.
        <br />
        Template Made By Mustafa Omar.
      </p>
      <div class="text-center mt-5">
        <v-btn
          href="https://google.com"
          target="_blank"
          density="comfortable"
          elevation="0"
          icon
          color="grey-lighten-3"
          class="mx-2"
        >
          <v-icon size="20">mdi-facebook</v-icon>
        </v-btn>
        <v-btn
          href="https://google.com"
          target="_blank"
          density="comfortable"
          elevation="0"
          icon
          color="grey-lighten-3"
          class="mx-2"
        >
          <v-icon size="20">mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          href="https://google.com"
          target="_blank"
          density="comfortable"
          elevation="0"
          icon
          color="grey-lighten-3"
          class="mx-2"
        >
          <v-icon size="20">mdi-linkedin</v-icon>
        </v-btn>
        <v-btn
          href="https://google.com"
          target="_blank"
          density="comfortable"
          elevation="0"
          icon
          color="grey-lighten-3"
          class="mx-2"
        >
          <v-icon size="20">mdi-youtube</v-icon>
        </v-btn>
      </div>
      <p class="mx-auto text-center text-grey-darken-2 mt-5">
        This email was sent to you as a registered member of
        <a href="#">vuetifystarter.tld</a>
        <br />
        To update your emails preferences
        <a href="#">click here</a>
        .
      </p>
    </v-sheet>
  </app-sheet>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLoader } from '@/composables/useLoader'

const loader = useLoader()

onMounted(() => {
  loader.markAsLoaded()
})
</script>
