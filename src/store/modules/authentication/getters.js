export default {
  isLoggedIn: (state) => state.isLoggedIn && state.user,
  isLoading: (state) => state.isLoading,
}
