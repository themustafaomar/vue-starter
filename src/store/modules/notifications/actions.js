import axios from '@/plugins/axios'

export default {
  async fetch({ commit }) {
    commit('setLoading', true)

    const notifications = await axios.get('/notifications')

    commit('setNotifications', notifications.data.data)
    commit('setLoading', false)
    commit('setLoaded', true)
  },
  async markAsRead({ commit }, id) {
    await axios.post(`/notifications/${id}/markas/read`)

    commit('markAsRead', id)
  },
  async markAllAsRead({ state, commit }) {
    if (!state.notifications.filter((n) => n.read_at === null).length) {
      return
    }

    await axios.post('/notifications/mark-all-as-read')

    commit('setUnreadBadge', false)
    commit('markAllAsRead')
  },
  async remove({ commit }, id) {
    await axios.post(`/notifications/${id}`, {
      _method: 'DELETE'
    })

    commit('remove', id)
  }
}
