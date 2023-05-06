import storage from '@/plugins/storage'

export default {
  loading(state) {
    state.isLoading = true
  },
  loaded(state) {
    state.isLoading = false
  },
  login(state, user) {
    state.user = user
    state.isLoggedIn = true
    storage.set('user', JSON.stringify(user))
  },
  logout(state) {
    state.user = {}
    state.isLoggedIn = false
    storage.remove('user')
  },
}
