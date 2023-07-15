<template>
  <v-toolbar
    density="comfortable"
    color="surface"
    class="position-relative py-1"
    style="z-index: 1"
  >
    <v-skeleton-loader
      v-if="isLoadingChat"
      type="list-item-avatar-two-line"
      width="225"
      class="px-5"
    />

    <v-list-item
      v-else
      lines="two"
      :prepend-avatar="conversation.avatar"
      density="comfortable"
      :title="conversation.name"
      subtitle="Driver"
    />

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-phone-outline</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn> -->

    <v-menu>
      <template #activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>

      <v-list elevation="0" class="shadow-lg rounded-md">
        <v-list-item>
          <v-list-item-title>Delete Chat</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title class="text-red">Block</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script setup>
defineProps({
  conversation: Object,
  isLoadingChat: Boolean,
})
</script>
