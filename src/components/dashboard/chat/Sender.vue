<template>
  <!-- clearable -->
  <v-text-field
    v-model="message"
    placeholder="Type your message here.."
    type="text"
    hide-details
    density="default"
    bg-color="white"
    @keyup.enter="send"
    @keyup="enableTyping"
    @focus="checkSeen"
    class="chat-sender px-5"
  >
    <template #prepend-inner>
      <v-btn
        @click="isEmojiesPickerActive = !isEmojiesPickerActive"
        icon
        color="transparent"
        elevation="0"
        density="comfortable"
        @updateEmoji="emojiespicked"
      >
        <v-icon icon="mdi-emoticon-outline"></v-icon>
      </v-btn>
    </template>

    <template #append-inner>
      <v-fade-transition leave-absolute>
        <v-progress-circular
          v-if="loading"
          color="info"
          indeterminate
          size="24"
        ></v-progress-circular>

        <v-btn @click="send" variant="plain" icon color="transparent" :disabled="!message">
          <v-icon color="primary" icon>mdi-send</v-icon>
        </v-btn>
      </v-fade-transition>
    </template>
  </v-text-field>

  <EmojiesPicker
    v-if="isEmojiesPickerActive"
    @emoji:selected="message = (message || '') + $event"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useChatStore } from '@/stores/chats'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import EmojiesPicker from './EmojiesPicker.vue'

const appStore = useAppStore()
const chatStore = useChatStore()
const authStore = useAuthStore()
const message = ref(null)
const loading = ref(false)
const isEmojiesPickerActive = ref(false)
const state = reactive({
  timeout: null,
  oldValue: null,
})

onMounted(() => {
  Echo.private('hello').listenForWhisper('typing', ({ typing }) => {
    chatStore.isPartnerTyping = typing
  })
})

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

  Echo.private('hello').whisper('typing', {
    typing: true,
  })

  state.timeout = setTimeout(() => {
    Echo.private('hello').whisper('typing', {
      typing: false,
    })
  }, 800)
}

const send = () => {
  if (!message.value) {
    return
  } else if (message.value?.length > 500) {
    return appStore.notify({
      message: 'Maximum allowable characters are 500',
      color: 'red',
    })
  }

  chatStore.send({
    from_id: authStore.user.id,
    user: authStore.user,
    body: message.value,
  })

  message.value = null
}

const emojiespicked = (x) => {
  console.log(x)
}
</script>

<style>
.emoji-mart {
  position: absolute;
  z-index: 99;
  bottom: 81px;
  left: 20px;
}
</style>
