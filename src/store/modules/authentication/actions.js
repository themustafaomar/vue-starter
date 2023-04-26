import router from '@/router'
import axios from '@/plugins/axios'

const BASE_URL = 'http://localhost:8000/'

export default {
  async login({ commit }, form) {
    commit('loading')

    return new Promise((resolve) => {
      axios
        .get(`${BASE_URL}sanctum/csrf-cookie`)
        .then(async () => {
          commit('loaded')

          const { data } = await axios.post(`${BASE_URL}login`, form)

          // We've just get the user from the response
          commit('login', data.user)
          resolve()

          // Go home
          router.push('dashboard')
        })
        .catch((error) => {
          commit('loaded')

          console.log(error.response || error.message || error)
        })
    })
  },
  async logout({ commit }) {
    // Fake logout request
    await new Promise((resolve) => setTimeout(() => resolve(), 250))

    // Logout by clearning authentication data
    commit('logout')

    // Go to login
    router.push('login')
  }
}
