export default {
  get: (state) => state.notifications,
  unreadBadge: (state) => state.unreadBadge,
  loading: (state) => state.isLoading,
  loaded: (state) => state.loaded,
  hasUnread: (state) => state.notifications.filter(({ read_at }) => read_at === null).length,
}
