import axios from '@/plugins/axios'
import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    unreadBadge: false,
    isLoading: false,
    loaded: false,
  }),
  getters: {
    get: (state) => state.notifications,
    hasUnread: (state) => state.notifications.filter(({ read_at }) => read_at === null).length,
    // prettier-ignore
    unreadNumber: (state) => state.notifications.filter((notification) => notification.read_at === null).length,
  },
  actions: {
    async fetch() {
      this.isLoading = true

      const notifications = await axios.get('/notifications')

      this.notifications = notifications.data.data
      this.isLoading = false
      this.loaded = true
    },
    async markAsRead(id) {
      await axios.post(`/notifications/${id}/markas-read`)

      const notification = this.notifications.find((n) => n.id === id)

      if (notification) {
        notification.read_at = true
      }

      if (!this.notifications.filter((n) => n.read_at == null).length) {
        this.unreadBadge = false
      }
    },
    async markAllAsRead() {
      if (!this.notifications.filter((n) => n.read_at === null).length) {
        return
      }

      await axios.post('/notifications/mark-all-as-read')

      this.unreadBadge = false
      this.notifications.forEach((n) => (n.read_at = true))
    },
    async remove(id) {
      await axios.post(`/notifications/${id}`, {
        _method: 'DELETE',
      })

      this.notifications.splice(
        this.notifications.findIndex((n) => n.id === id),
        1
      )
    },
  },
})
