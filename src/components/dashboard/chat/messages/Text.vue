<template>
  <li
    class="d-flex mb-5"
    :class="{ 'justify-start': !current, 'flex-end flex-row-reverse': current }"
  >
    <v-avatar v-if="data.type === 'text'" size="40">
      <v-img cover :src="data.user.avatar"></v-img>
    </v-avatar>

    <!-- The message body -->
    <div style="max-width: 850px" :class="{ 'text-end': current, 'opacity-75': data.hasFailed }">
      <!-- Text message -->
      <div
        class="bg-grey-lighten-3 d-inline-block rounded-pill py-2 px-5"
        :class="{ 'ms-4': !current, 'bg-primary me-4': current }"
      >
        {{ data.body }}
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
import ChatMessagesAudioPlayer from './Voice.vue'

const props = defineProps({ data: Object })
const user = useUser()
const current = computed(() => {
  return user.id == props.data.from_id
})
</script>
