export default {
  user: (state) => state.user,
  isLoggedIn: (state) => state.isLoggedIn && state.user,
  isLoading: (state) => state.isLoading,
}
