import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { useUser } from '@/composables/useUser'
import axios from '@/plugins/axios'

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
    chatMeta: {},
  }),
  getters: {
    getConversations: (state) => {
      const user = useUser()
      return state.conversations.map((conversation) => {
        // Append unread count badge if the partner's last message is not yet seen
        if (!conversation.is_seen && conversation.from_id != user.id) conversation.unreadCount = 1
        return conversation
      })
    },
  },
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

      const { data } = await axios.get(`/chat/${id.id}`)

      this.$patch({
        chat: data.data,
        chatMeta: data.meta,
        // Notice that `id` is not an actuall id
        // it's a whole object of a conversation object
        // this is due to a stupid event fired from Vuetify
        activeConversation: id,
        isLoadingChat: false,
      })

      // Let's mark our recently loaded chat as seen
      // as soon as it's successfully loaded, makes sense isn't it?
      this.markConversationAsSeen()
    },
    async send(message) {
      // Creating a fake unique id for recently created message
      const uid = Math.random(10000) * 10000

      this.chat.push({
        id: uid,
        ...message,
        created_at: dayjs(new Date()).format('h:mm:A'),
        isRecentlySended: true,
      })

      const chatMessage = this.chat.find(({ id }) => id === uid)
      const form = new FormData()

      form.append('id', this.activeConversation.id)
      form.append('type', message.type)

      if (message.type === 'text') {
        form.append('body', message.body)
      } else if (message.type === 'record') {
        form.append('record', message.blob, 'record.wav')
      }

      try {
        await axios.post('/chat', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        chatMessage.isRecentlySended = false
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
  },
})
