import storage from '@/plugins/storage'

export default {
  login(state, { user, permissions }) {
    state.isLoggedIn = true
    state.user = user
    state.permissions = permissions

    window.Laravel = {
      jsPermissions: permissions || 0,
    }

    storage.set({
      user: JSON.stringify(user),
      permissions: JSON.stringify(permissions),
    })
  },
  logout(state) {
    state.isLoggedIn = false
    state.user = {}
    state.permissions = {}

    window.Laravel = {
      jsPermissions: 0,
    }

    storage.remove('user', 'permissions')
  },
  loading(state) {
    state.isLoading = true
  },
  loaded(state) {
    state.isLoading = false
  },
}
