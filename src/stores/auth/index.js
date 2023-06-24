import { defineStore } from 'pinia'
import storage from '@/plugins/storage'
import axios from '@/plugins/axios'
import router from '@/router'
import { isDev } from '@/utils'

const baseURL = isDev ? '@/' : import.meta.env.VITE_SERVER_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    _isLoggedIn: false,
    isLoading: false,
    user: {},
    permissions: {},
  }),
  getters: {
    isLoggedIn: (state) => !!state._isLoggedIn && !!state.user,
  },
  actions: {
    signin(form) {
      this.isLoading = true

      return new Promise((resolve) => {
        axios
          .get(`${baseURL}/sanctum/csrf-cookie`)
          .then(async () => {
            this.isLoading = false

            const { data } = await form.post(`${baseURL}/login`)

            // We've just get the user from the response
            this.login({ user: data.data.user, permissions: data.data.permissions })

            resolve()

            // Go home
            router.push('/dashboard')
          })
          .catch(() => {
            this.isLoading = false
          })
      })
    },
    login({ user, permissions }) {
      window.Laravel = {
        jsPermissions: permissions || 0,
      }

      this.$patch({
        _isLoggedIn: true,
        user: user,
        permissions: permissions,
      })

      storage.set({
        user: JSON.stringify(user),
        permissions: JSON.stringify(permissions),
      })
    },
    async logout() {
      this.loading()
      axios.post(`${baseURL}/logout`).then(() => {
        this.flush()
        router.push('/login').then(() => {
          this.loaded()
        })
      })
    },
    flush(fn) {
      this.$reset()
      window.Laravel = { jsPermissions: 0 }
      storage.remove('user', 'permissions')
      if (typeof fn === 'function') {
        fn()
      }
    },
    loading() {
      this.isLoading = true
    },
    loaded() {
      this.isLoading = false
    },
  },
})
