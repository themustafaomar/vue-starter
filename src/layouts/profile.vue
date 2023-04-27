<template>
  <v-app>
    <app-bar></app-bar>
    <!-- <v-app-bar flat>
      <v-container class="fill-height d-flex align-center">
        <v-avatar
          class="me-10 ms-4"
          color="grey"
          size="32">
        </v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          class="text-capitalize">
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            density="compact"
            hide-details
            variant="solo">
          </v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar> -->

    <v-main class="mt-2">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-title>List Item {{ n }}</v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey-lighten-4">
                  <v-list-item-title>Refresh</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-sheet rounded="lg" class="px-6 py-5">
                <h2 class="text-uppercase">Dashboard</h2>
                <p class="text-blue-grey-darken-2">
                  Welcome to dashboard, it's nice to see you again Jone Doe!
                </p>
              </v-sheet>

              <v-divider color="grey" />

              <div class="pa-6">
                <RouterView />
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/app/bar/Bar.vue'

export default {
  components: { AppBar },
  data: () => ({
    links: ['Dashboard', 'Messages', 'Profile', 'Updates'],
  }),
}
</script>
