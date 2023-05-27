import { defineStore } from 'pinia'
import storage from '@/plugins/storage'
import { useAuthStore } from '../auth'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    mode: 'light',
    auth: {
      homeURL: '/dashboard',
    },
    locale: {
      default: 'en',
      current: 'en',
    },
    snackbar: {
      show: false,
      message: '',
      color: 'primary',
      location: 'bottom center',
    },
    error: {
      show: false,
      message: '',
      type: '',
    },
  }),
  actions: {
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
      const { login, logout } = useAuthStore()

      try {
        user = JSON.parse(user)
        permissions = JSON.parse(permissions)
      } catch (err) {
        logout()
        return
      }

      if (user) {
        login({ user, permissions })
      }

      this.setLocale(locale)
      this.setMode(mode)
    },
    notify(options) {
      this.snackbar = {
        ...this.snackbar,
        // Allow passing a string instead of options object
        // we'll assume this is a success message, and take care of the color.
        ...(typeof options === 'string' ? { message: options, color: 'primary' } : options),
        show: true,
      }
    },
    error(options) {
      this.error = { ...this.error, ...options, show: true }
    },
    setLocale(locale) {
      this.locale.current = locale || this.locale.default
    },
    setMode(mode) {
      this.mode = mode || this.mode
    },
    loading() {
      this.isLoading = true
    },
    loaded() {
      this.isLoading = false
    },
  },
})
