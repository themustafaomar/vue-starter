export default {
  set(state, notifications) {
    state.notifications = notifications
  },
  push(state, notification) {
    state.notifications.unshift(notification)
  },
  pop(state, id) {
    // prettier-ignore
    state.notifications.splice(state.notifications.findIndex((n) => n.id === id), 1)
  },
  markAsRead(state, id) {
    const notification = state.notifications.find((n) => n.id === id)

    if (notification) {
      notification.read_at = true
    }

    if (!state.notifications.filter((n) => n.read_at == null).length) {
      state.unreadBadge = false
    }
  },
  markAllAsRead(state) {
    state.notifications.forEach((n) => (n.read_at = true))
  },
  setUnreadBadge(state, status) {
    state.unreadBadge = status
  },
  setLoading(state, status) {
    state.isLoading = status
  },
  setLoaded(state, status) {
    state.loaded = status
  },
}
