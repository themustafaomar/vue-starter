import storage from '@/plugins/storage'

export default {
  login(state, user) {
    state.user = user
    state.isLoggedIn = true
    storage.create('user', JSON.stringify(user))
  },
  logout(state) {
    state.user = {}
    state.isLoggedIn = false
    storage.remove('user')
  }
}
