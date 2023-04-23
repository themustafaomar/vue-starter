import router from '@/router'

export default {
  async login({ commit }) {
    // Fake login request
    const user = await new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            id: 1,
            name: 'Mustafa Omar',
            email: 'themustafaomar@gmail.com'
          }),
        750
      )
    )

    // We've just get the user from the response
    commit('login', user)

    // Go home
    router.push({ name: 'home' })
  },
  async logout({ commit }) {
    // Fake logout request
    await new Promise((resolve) => setTimeout(() => resolve(), 250))

    // Logout by clearning authentication data
    commit('logout')

    // Go to login
    router.push({ name: 'login' })
  }
}
