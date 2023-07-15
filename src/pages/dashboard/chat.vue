<template>
  <v-layout @keyup.esc="chatStore.closeChat()">
    <audio ref="sound">
      <source src="/message.mp3" type="audio/mpeg" />
    </audio>

    <app-dashboard-chat-conversations-list />

    <!--
      Equation: (Screen height - Navbar height - Top & Bottom paddings)
    -->
    <v-main style="height: calc(100vh - 64px - (24px * 2))">
      <v-sheet
        v-if="chatStore.activeConversation"
        class="position-relative h-100 ms-0 ms-lg-5"
        rounded="lg"
      >
        <app-dashboard-chat-toolbar
          :conversation="chatStore.activeConversation"
          :isLoadingChat="isLoadingChat"
        />

        <v-divider color="grey-darken-1" />

        <div @wheel="loadMore" ref="container" class="chat-container px-5 py-6">
          <div class="text-center">
            <v-progress-circular
              v-if="isLoadingMore"
              indeterminate
              size="30"
              color="grey-darken-2"
              bg-color="transparent"
              width="2.5"
              class="position-absolute"
            />
          </div>

          <div v-if="isLoadingChat" class="text-center mt-16">
            <v-progress-circular
              indeterminate
              color="grey-darken-2"
              width="2.5"
              bg-color="transparent"
            />
            <div class="mt-2">Loading...</div>
          </div>

          <ul v-else>
            <app-dashboard-chat-messages-message v-for="data in chat" :data="data" />
            <app-dashboard-chat-typing
              v-if="chat.length && isPartnerTyping"
              :partner="activeConversation"
            />
          </ul>
        </div>

        <div
          ref="sender"
          class="d-flex align-center position-absolute w-100 pa-5"
          style="bottom: 0; left: 0; height: 84px"
        >
          <app-dashboard-chat-sender />
        </div>
      </v-sheet>

      <app-dashboard-chat-empty v-else />
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { useChatStore } from '@/stores/chats'
import { useLoader } from '@/composables/useLoader'
import { useUser } from '@/composables/useUser'
import AppDashboardChatMessagesMessage from '@/components/dashboard/chat/messages/Message.vue'
import AppDashboardChatSender from '@/components/dashboard/chat/sender/Sender.vue'
import AppDashboardChatConversationsList from '@/components/dashboard/chat/conversations/List.vue'
import AppDashboardChatTyping from '@/components/dashboard/chat/Typing.vue'
import AppDashboardChatToolbar from '@/components/dashboard/chat/Toolbar.vue'
import AppDashboardChatEmpty from '@/components/dashboard/chat/Empty.vue'

const container = ref(null)
const sender = ref(null)
const sound = ref(null)
const route = useRoute()
const loader = useLoader()
const user = useUser()
const chatStore = useChatStore()
// prettier-ignore
const {
  chat,
  isLoadingChat,
  isLoadingMore,
  isPartnerTyping,
  activeConversation,
  conversations,
} = storeToRefs(chatStore)

const CHANNEL_CHAT_MESSAGE = `chat.${user.id}`
const CHANNEL_SEEN = `seen.${user.id}`

// Watchers

watch(isPartnerTyping, _watchScroll)
watch(chat, _watchScroll, { deep: true })
watch(activeConversation, () => (isPartnerTyping.value = false))
watch(() => [route.query.conversation, chatStore.hasLoadedConversations], _loadConversationFromId, {
  immediate: true,
})

// Lifecycle Hooks

onMounted(() => {
  loader.markAsLoaded()

  Echo.private(CHANNEL_CHAT_MESSAGE).listen('.message-received', (message) => {
    // Highlight the conversation with a little badge
    // containing the total unread messages.
    const conversationId = message.from_id
    const conversation = conversations.value.find(({ id }) => id == conversationId)
    const unreadCount = Number.parseInt(parseInt(conversation.unreadCount)) || 0

    conversation.unreadCount = unreadCount + 1
    conversation.body = message.body
    sound.value.play()

    // @TODO: check if the input is focused
    // If yes, remove the conversation badge..

    // We'll check if no active conversation, if yes we
    // will abort the remaining proccess wich is responsible
    // for adding the chat message to the chat stack.
    if (!activeConversation.value) {
      return
    }

    chat.value.push(message)
  })

  // Let's mark our unread messages as seen when broadcasting happens
  Echo.private(CHANNEL_SEEN).listen('.conversation-seen', () => {
    chat.value
      .filter((message) => message.from_id === user.id)
      .forEach((item) => {
        item.is_seen = true
      })
  })
})

onUnmounted(() => {
  chatStore.closeChat()
  Echo.leaveChannel(CHANNEL_CHAT_MESSAGE)
  Echo.leaveChannel(CHANNEL_SEEN)
})

// Close the conversation when the user clicks Escape button.
useEventListener(document, 'keydown', (e) => {
  if (e.key === 'Escape') chatStore.closeChat()
})

// Functions

function _loadConversationFromId() {
  const conversationId = route.query.conversation
  if (!conversationId) {
    return
  }

  const conversation = conversations.value.find((c) => c.id == conversationId)
  if (conversation) {
    chatStore.activeConversation = conversation
    chatStore.fetchChat({
      id: conversation,
    })
  }
}

const loadMore = (event) => {
  const currentTarget = event.currentTarget
  const scrollTop = currentTarget.scrollTop
  const scrollHeight = currentTarget.scrollHeight
  const vScroll = Math.round(scrollHeight / 4)

  // Abort loading more in these cases..
  if (
    event.wheelDelta < 0 ||
    scrollTop >= vScroll ||
    isLoadingMore.value ||
    chat.value.length < 15
  ) {
    return
  }

  chatStore
    .loadMore()
    .then(() => {
      const newScrollHeight = currentTarget.scrollHeight
      currentTarget.scrollTop = newScrollHeight - scrollHeight
    })
    .catch()
}

function _watchScroll() {
  if (isLoadingMore.value || !chat.value.length) {
    return
  }

  setTimeout(() => {
    const element = container.value
    element.scrollTop = element.scrollHeight
  })
}
</script>

<style lang="scss">
.chat-container {
  // Equation: (Full height of parent - Chat toolbar height - Sender input)
  height: calc(100% - 64px - 84px);
  overflow-y: auto;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
    background-image: url(/3714883_1976989.jpg);
    background-attachment: fixed;
    background-size: 350px;
    background-repeat: repeat;
    opacity: 0.085;
  }
  ul {
    position: relative;
    list-style: none;
    height: 100%;
    z-index: 1;
  }
}
</style>
