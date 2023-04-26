import storage from '@/plugins/storage'

export default {
  setup() {
    const user = storage.get('user')

    if (user) {
      this.commit('auth/login', JSON.parse(user))
    }
  },
  notify(state, options) {
    state.snackbar = {
      ...state.snackbar,
      ...options,
      show: true,
    }
  },
  resetToast(state) {
    state.snackbar.show = false
  },
}
