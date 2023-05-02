import router from '@/router'
import axios from '@/plugins/axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export default {
  async login({ commit, rootState }, form) {
    commit('loading')

    return new Promise((resolve) => {
      axios
        .get(`${SERVER_URL}/sanctum/csrf-cookie`)
        .then(async () => {
          commit('loaded')

          const { data } = await form.post(`${SERVER_URL}/login`)

          // We've just get the user from the response
          commit('login', data.user)
          resolve()

          // Go home
          router.push(rootState.app.auth.homeURL)
        })
        .catch(() => {
          commit('loaded')
        })
    })
  },
  async logout({ commit }) {
    await axios.post(`${SERVER_URL}/logout`)

    // Logout by clearning authentication data
    commit('logout')

    // Go to login
    router.push('login')
  },
}
