import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { useUser } from '@/composables/useUser'
import axios from '@/plugins/axios'

export const useChatStore = defineStore('chats', {
  state: () => ({
    unreadCount: false,
    isLoadingConversations: false,
    isLoadingChat: false,
    isLoadingMore: false,
    isPartnerTyping: false,
    hasLoadedConversations: false,
    activeConversation: null,
    conversations: [],
    chat: [],
    chatMeta: {},
  }),
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
    async fetchChat({ id: conversation }) {
      this.isLoadingChat = true

      const { data } = await axios.get(`/chat/${conversation.id}`)

      this.$patch({
        chat: data.data,
        chatMeta: data.meta,
        activeConversation: conversation,
        isLoadingChat: false,
      })

      const unreadCount = conversation.unread_count
      if (unreadCount) {
        this.unreadCount = this.unreadCount - unreadCount
      }

      // Let's mark our recently loaded chat as seen
      // as soon as it's successfully loaded, makes sense isn't it?
      this.markConversationAsSeen()
    },
    async send(message) {
      const length = this.chat.push({
        ...message,
        created_at: dayjs(new Date()).format('h:mm:A'),
        isRecentlySended: true,
      })

      const chatMessage = this.chat[length - 1]
      const form = new FormData()

      form.append('id', this.activeConversation.id)
      form.append('type', message.type)

      if (message.type === 'text') {
        form.append('body', message.body)
      } else if (message.type === 'voice') {
        form.append('voice', message.blob, 'voice.mp3')
      }

      try {
        await axios.post('/chat', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        chatMessage.isRecentlySended = false
        this.activeConversation.type = message.type
        this.activeConversation.body = message.body
        this.activeConversation.from_id = message.from_id
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

      // No need to send a seen http request as long as no unread messages
      if (!unreadMessages.length) {
        return
      }

      const conversation = this.activeConversation

      if (conversation && conversation.unread_count) {
        conversation.unread_count = false
      }

      axios.post(`/chat/conversations/${conversation.id}/seen`).then(() => {
        unreadMessages.forEach((message) => {
          message.is_seen = true
        })
      })
    },
    createConversationItem(data, conversationId) {
      const newConversation = {
        id: conversationId,
        name: data.name,
        avatar_url: data.avatar,
        from_id: conversationId,
        body: '...',
        type: 'text',
      }
      this.conversations.unshift(newConversation)
      this.activeConversation = newConversation
    },
    loadMore() {
      this.isLoadingMore = true

      const { current_page, last_page } = this.chatMeta
      const currentPage = current_page + 1

      if (currentPage > last_page) {
        this.isLoadingMore = false
        return Promise.reject()
      }

      return axios
        .get(`/chat/${this.activeConversation.id}?page=${current_page + 1}`)
        .then(({ data }) => {
          data.data.forEach((message) => {
            this.chat.unshift(message)
          })

          // A workaround to trick the scroll watcher not to scroll down
          setTimeout(() => (this.isLoadingMore = false), 50)

          this.chatMeta = data.meta
        })
    },
    setUnreadCount(count) {
      this.unreadCount = count
    },
  },
})
