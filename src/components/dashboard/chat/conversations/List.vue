<template>
  <v-navigation-drawer elevation="0" :border="0" width="320" rounded="lg">
    <!-- <chat-settings ref="settings" /> -->

    <template v-if="!isLoadingConversations">
      <h3 class="font-weight-medium px-4 my-4">Chats</h3>

      <v-list
        density="comfortable"
        @click:select="fetchChat($event)"
        @keyup.esc="closeChat"
        mandatory
        class="conversations-list py-0"
      >
        <v-list-item
          v-for="conversation in conversations"
          :value="conversation"
          :key="conversation.id"
          color="primary"
          class="py-3"
        >
          <template #prepend>
            <v-avatar :image="conversation.avatar" />
          </template>

          <h4 class="font-weight-medium d-flex align-center justify-space-between">
            {{ conversation.name }}
            <small class="font-weight-regular text-grey">
              {{ dayjs(conversation.max_created_at).format('d MMMM') }}
            </small>
          </h4>

          <small class="text-grey-darken-1">
            {{ conversation.from_id === user.id ? 'You:' : '' }}

            <template v-if="conversation.type === 'text'">
              {{ $slice(conversation.body, 20) }}
            </template>

            <template v-if="conversation.type === 'voice'">
              <v-icon color="grey-darken-2">mdi-microphone-outline</v-icon>
              Voice Message
            </template>
          </small>

          <template #append>
            <v-badge
              v-if="conversation.unread_count"
              inline
              size="small"
              :content="conversation.unread_count"
              color="red"
              class="mt-5"
            ></v-badge>
          </template>
        </v-list-item>
      </v-list>
    </template>

    <div v-else class="px-3 pt-3">
      <v-skeleton-loader max-width="85%" type="list-item-two-line" />
      <v-skeleton-loader
        class="mx-auto"
        type="list-item-avatar-two-line, list-item-three-line, sentences, list-item-avatar-two-line, list-item-three-line"
      />
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chats'
// import ChatSettings from '@/components/dashboard/chat/Settings.vue'

const authStore = useAuthStore()
const chatStore = useChatStore()
const { user } = storeToRefs(authStore)
const { conversations, isLoadingConversations } = storeToRefs(chatStore)
const { fetchConversations, fetchChat, closeChat } = chatStore

fetchConversations()
</script>

<style lang="scss">
.conversations-list {
  .v-list-item__append {
    position: absolute;
    right: 0;
  }
}
</style>
