import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import dayjs from 'dayjs'
import { useUser } from '@/composables/useUser'

export const useChatStore = defineStore('chats', {
  state: () => ({
    isLoadingConversations: false,
    isLoadingChat: false,
    isLoadingMore: false,
    isPartnerTyping: false,
    hasLoadedConversations: false,
    activeConversation: null,
    conversations: [],
    chat: [],
  }),
  getters: {},
  actions: {
    async fetchConversations() {
      this.isLoadingConversations = true

      const conversations = await axios.get('/chat/conversations')

      this.$patch({
        conversations: conversations.data.data,
        isLoadingConversations: false,
        hasLoadedConversations: true,
      })
    },
    async fetchChat({ id }) {
      this.isLoadingChat = true

      const chat = await axios.get(`/chat/${id.id}`)

      this.$patch({
        chat: chat.data.data,
        isLoadingChat: false,
        activeConversation: id,
      })
    },
    async send(message) {
      const uid = Math.random(10000) * 10000

      this.chat.push({
        id: uid,
        ...message,
        isRecentlySended: true,
        created_at: dayjs(new Date().toLocaleString()).format('h:mm:A'),
      })

      const chatMessage = this.chat.find((m) => m.id === uid)

      try {
        await axios.post('/chat', { id: this.activeConversation.id, body: message.body })
        chatMessage.isRecentlySended = false
      } catch (error) {
        chatMessage.hasFailed = true
      }
    },
    closeChat() {
      if (!this.activeConversation) {
        console.warn('Closing chat but no active conversation!')
        return
      }

      this.$patch({
        activeConversation: null,
        chat: [],
      })
    },
    _getPartnerUnreadMessages() {
      const user = useUser()
      return this.chat.filter(({ from_id, is_seen }) => from_id != user.id && !is_seen)
    },
    markConversationAsSeen() {
      const unreadMessages = this._getPartnerUnreadMessages()

      if (!unreadMessages.length) {
        return
      }

      const conversation = this.activeConversation

      if (conversation && conversation.unreadCount) {
        conversation.unreadCount = false
      }

      axios.post(`/chat/conversations/${conversation.id}/seen`).then(() => {
        unreadMessages.forEach((message) => {
          message.is_seen = true
        })
      })
    },
    loadMore() {
      this.isLoadingMore = true
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.chat.unshift({
            id: 101,
            from_id: 2,
            body: 'A new message loaded',
            created_at: '5:45 AM',
            user: {
              avatar: '/avatar.jpg',
            },
          })
          this.chat.unshift({
            id: 1211,
            from_id: 1,
            body: 'Another message has just loaded',
            created_at: '5:45 AM',
            user: {
              avatar: '/avatar.jpg',
            },
          })
          this.chat.unshift({
            id: 1211,
            from_id: 2,
            body: 'Another message has just loaded',
            created_at: '5:45 AM',
            user: {
              avatar: '/avatar.jpg',
            },
          })
          setTimeout(() => {
            this.isLoadingMore = false
          })
          resolve()
        }, 1000)
      })
    },
  },
})
