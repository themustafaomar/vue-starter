<template>
  <v-text-field
    v-if="!isRecording"
    v-model="message"
    placeholder="Type your message here"
    type="text"
    hide-details
    density="comfortable"
    bg-color="white"
    variant="plain"
    @keyup.enter="send('text', message)"
    @keyup="enableTyping"
    @focus="checkSeen"
    class="chat-sender"
    :loading="loading"
  >
    <template #prepend-inner>
      <v-btn icon elevation="0" density="comfortable" class="mt-n1">
        <v-icon>mdi-attachment</v-icon>
      </v-btn>
    </template>

    <template #append-inner>
      <v-btn
        @click="isEmojiesPickerActive = !isEmojiesPickerActive"
        icon
        elevation="0"
        density="comfortable"
      >
        <v-icon size="28" color="grey-darken-2">mdi-emoticon-outline</v-icon>
      </v-btn>
    </template>

    <template #append>
      <v-btn @click="enableRecording" icon size="40" elevation="0">
        <v-icon icon="mdi-microphone" size="28" color="grey-darken-2"></v-icon>
      </v-btn>
    </template>
  </v-text-field>

  <app-dashboard-chat-sender-recorder
    @abort="isRecording = false"
    @recorded=";(isRecording = false), send('voice', $event)"
    :is-recording="isRecording"
    v-else
  />

  <EmojiesPicker
    v-if="isEmojiesPickerActive"
    @emoji:selected="message = (message || '') + $event"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useDevicesList } from '@vueuse/core'
import { useChatStore } from '@/stores/chats'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import EmojiesPicker from './EmojiesPicker.vue'
import AppDashboardChatSenderRecorder from './Recorder.vue'

const message = ref(null)
const loading = ref(false)
const isRecording = ref(false)
const isEmojiesPickerActive = ref(false)
const appStore = useAppStore()
const chatStore = useChatStore()
const authStore = useAuthStore()
const state = reactive({
  timeout: null,
  oldValue: null,
})
const { ensurePermissions } = useDevicesList({
  constraints: { audio: true },
})

// Lifecycle Hooks

onMounted(() => {
  Echo.private(`chat-typing`).listenForWhisper('typing', ({ typing }) => {
    chatStore.isPartnerTyping = typing
  })
})

// Functions

const checkSeen = () => {
  chatStore.markConversationAsSeen()
}

const enableTyping = (e) => {
  const value = e.target.value
  if (value === state.oldValue) {
    console.warn('Nothing changes')
    return
  }

  state.oldValue = value
  clearTimeout(state.timeout)

  Echo.private(`chat-typing`).whisper('typing', {
    typing: true,
  })

  state.timeout = setTimeout(() => {
    Echo.private(`chat-typing`).whisper('typing', {
      typing: false,
    })
  }, 800)
}

const enableRecording = () => {
  ensurePermissions().then(() => {
    isRecording.value = true
  })
}

const send = (type, data) => {
  if (type === 'text') {
    if (!message.value) {
      return
    } else if (message.value?.length > 500) {
      return appStore.notify({
        message: 'Maximum allowable characters are 500',
        color: 'red',
      })
    }
  }

  let additionals = {}
  if (type === 'text') {
    additionals.body = message.value
  } else if (type === 'voice') {
    additionals = data
  }

  chatStore.send({
    type,
    from_id: authStore.user.id,
    user: authStore.user,
    ...additionals,
  })

  message.value = null
}
</script>

<style>
.emoji-mart {
  position: absolute;
  z-index: 99;
  bottom: 81px;
  right: 70px;
}
</style>
