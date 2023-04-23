export default {
  get: (state) => state.notifications,
  unreadBadge: (state) => state.unreadBadge,
  loading: (state) => state.isLoading,
  loaded: (state) => state.loaded
}
