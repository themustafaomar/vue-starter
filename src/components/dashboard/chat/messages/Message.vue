<template>
  <li
    class="d-flex mb-5"
    :class="{ 'justify-start': !current, 'flex-end flex-row-reverse': current }"
  >
    <v-avatar v-if="data.type === 'text'" size="40">
      <v-img cover :src="data.user.avatar"></v-img>
    </v-avatar>

    <v-badge
      v-if="data.type === 'voice'"
      color="transparent"
      offset-y="8"
      offset-x="9"
      location="bottom end"
    >
      <template #badge>
        <v-icon size="23" color="grey-darken-2">mdi-microphone</v-icon>
      </template>
      <v-avatar size="40" :image="data.user.avatar" class="mt-2" />
    </v-badge>

    <!-- The message body -->
    <div :class="{ 'text-end': current, 'opacity-75': data.hasFailed }">
      <!-- <v-btn icon variant="flat" density="compact" class="d-none me-2">
        <v-icon size="20" color="grey-darken-1">mdi-emoticon-happy-outline</v-icon>
      </v-btn> -->

      <!-- Text message -->
      <div
        v-if="data.type === 'text'"
        class="bg-grey-lighten-3 d-inline-block rounded-pill py-2 px-5"
        :class="{ 'ms-4': !current, 'bg-primary me-4': current }"
      >
        {{ data.body }}
      </div>

      <!-- Voice message -->
      <div v-else>
        <div class="d-inline-block rounded-pill" :class="{ 'ms-4': !current, 'me-4': current }">
          <app-dashboard-chat-messages-audio-player :source="data.source" />
        </div>
      </div>

      <!-- In case of failure to send a message -->
      <small v-if="data.hasFailed" class="d-block text-red me-4">Failed to send message</small>

      <!-- The message footer -->
      <small
        v-else
        class="d-block text-grey-darken-1 mt-1"
        :class="{ 'ms-4': !current, 'text-end me-4': current }"
      >
        {{ data.created_at }}

        <v-icon v-if="data.isRecentlySended" color="grey-lighten-1">mdi-check</v-icon>

        <v-icon
          v-if="current && !data.isRecentlySended"
          :color="data.is_seen ? '#15d500' : 'grey-lighten-1'"
        >
          mdi-check-all
        </v-icon>
      </small>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useUser } from '@/composables/useUser'
import AppDashboardChatMessagesAudioPlayer from './AudioPlayer.vue'

const props = defineProps({ data: Object })
const user = useUser()
const current = computed(() => {
  return user.id == props.data.from_id
})
</script>
