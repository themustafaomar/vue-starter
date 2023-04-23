import storage from '@/plugins/storage'

export default {
  setup() {
    const user = storage.get('user')

    if (user) {
      this.commit('auth/login', JSON.parse(user))
    }
  }
}
