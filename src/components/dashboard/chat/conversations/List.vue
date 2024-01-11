<template>
  <v-navigation-drawer elevation="0" :border="0" width="350" rounded="lg">
    <template #prepend>
      <v-list-item
        lines="two"
        :prepend-avatar="user.avatar"
        density="comfortable"
        class="d-flex py-3"
      >
        <h4 class="font-weight-medium mb-0">{{ user.name }}</h4>
        <div class="d-flex align-center text-medium-emphasis text-body-2">
          <v-badge location="end center" color="green" dot inline class="ms-n1" />
          {{ (permissions?.roles?.[0] || '').replace('-', ' ') }}
        </div>
        <!-- <template #append>
          <v-btn @click="$refs.settings.open()" variant="flat" icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template> -->
      </v-list-item>
    </template>

    <chat-settings ref="settings" />

    <v-divider color="grey-darken-1" />

    <template v-if="!isLoadingConversations">
      <h3 class="font-weight-medium px-4 my-4">Chats</h3>

      <v-list
        density="comfortable"
        @click:select="loadChat"
        @keyup.esc="closeChat"
        mandatory
        class="py-0"
      >
        <template v-for="conversation in getConversations">
          <v-list-item color="primary" class="py-3" :value="conversation">
            <template #prepend>
              <v-avatar>
                <v-img :src="conversation.avatar"></v-img>
              </v-avatar>
            </template>

            <h4 class="font-weight-medium">{{ conversation.name }}</h4>

            <small class="text-grey-darken-1">
              {{ conversation.from_id === user.id ? 'You:' : '' }}

              <!-- prettier-ignore -->
              <template v-if="conversation.type === 'text'">
              {{ conversation.body?.length >= 25? conversation.body?.slice(0, 20) + '...': conversation.body }}
              </template>

              <template v-if="conversation.type === 'voice'">
                <v-icon color="grey-darken-2">mdi-microphone-outline</v-icon>
                Voice Message
              </template>
            </small>

            <template #append>
              <div class="d-flex justify-start flex-column">
                <small class="text-grey-darken-1 mt-n3">
                  {{ dayjs(conversation.max_created_at).format('MMMM d') }}
                </small>
                <v-badge
                  v-if="conversation.unreadCount"
                  inline
                  size="small"
                  :content="conversation.unreadCount"
                  color="red"
                  class="mt-2 ms-n1"
                ></v-badge>
              </div>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </template>

    <div v-else class="px-5 pt-5">
      <v-skeleton-loader max-width="85%" type="list-item-two-line" />
      <v-skeleton-loader
        class="mx-auto"
        type="list-item-avatar-two-line, list-item-three-line, sentences, list-item-avatar-two-line, list-item-three-line"
      ></v-skeleton-loader>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import dayjs from 'dayjs'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chats'
import ChatSettings from '@/components/dashboard/chat/Settings.vue'

const authStore = useAuthStore()
const chatStore = useChatStore()
const { user, permissions } = storeToRefs(authStore)
const { getConversations, isLoadingConversations } = storeToRefs(chatStore)
const { fetchConversations, fetchChat, closeChat } = chatStore

onMounted(() => {
  fetchConversations()
})

const loadChat = (conversation) => {
  fetchChat(conversation)
}
</script>
