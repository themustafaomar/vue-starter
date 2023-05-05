import storage from '@/plugins/storage'

export default {
  setup() {
    const { user, mode } = storage.getMany('user', 'mode')

    if (mode) {
      this.commit('app/setMode', mode)
    }

    if (user) {
      this.commit('auth/login', JSON.parse(user))
    }
  },
  setMode(state, mode) {
    state.mode = mode
  },
  loading(state) {
    state.isLoading = true
  },
  loaded(state) {
    state.isLoading = false
  },
  notify(state, options) {
    state.snackbar = {
      ...state.snackbar,
      // Allow passing a string instead of options object
      // we'll assume this is a success message, and take care of the color.
      ...(typeof options === 'string' ? { message: options, color: 'primary' } : options),
      show: true,
    }
  },
  error(state, options) {
    state.error = {
      ...state.error,
      ...options,
      show: true,
    }
  },
}
