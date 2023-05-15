import storage from '@/plugins/storage'

export default {
  // Here we will populate the store with the initial data
  // needed to run the app, this data will come from the local storage
  // it's important to know that this `init` method runs only once.
  init() {
    // prettier-ignore
    let {
      user,
      mode,
      locale,
      permissions,
    } = storage.get('user', 'permissions', 'mode', 'locale')

    try {
      user = JSON.parse(user)
      permissions = JSON.parse(permissions)
    } catch (err) {
      this.dispatch('auth/logout')
      return
    }

    if (user) {
      this.commit('auth/login', { user, permissions })
    }

    this.commit('setLocale', locale)
    this.commit('setMode', mode)
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
    state.error = { ...state.error, ...options, show: true }
  },
  setLocale(state, locale) {
    state.locale.current = locale || state.locale.default
  },
  setMode(state, mode) {
    state.mode = mode || state.mode
  },
  loading(state) {
    state.isLoading = true
  },
  loaded(state) {
    state.isLoading = false
  },
}
