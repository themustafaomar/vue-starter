import storage from '@/plugins/storage'

export default {
  setup() {
    const { user, mode, locale } = storage.getMany('user', 'mode', 'locale')

    if (user) this.commit('auth/login', JSON.parse(user))

    if (mode) this.commit('setMode', mode)

    if (locale) this.commit('setLocale', locale)
  },
  setMode(state, mode) {
    state.mode = mode
  },
  setLocale(state, locale) {
    state.locale.current = locale
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
