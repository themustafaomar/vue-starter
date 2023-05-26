import { useAuthStore } from '@/stores/auth'

export default ({ store, router, next, guest, permissions }) => {
  const authStore = useAuthStore()

  // Example of implementing permissions
  if (permissions.exist() && !permissions.can(permissions.get())) {
    console.warn('This user has no permissions to enter.')
    return router.go(-1)
  }

  // This is a guest route, and the user is authorized
  // let's redirect him/her to the dashboard home page.
  if (guest && authStore.isLoggedIn) {
    return router.push(store.state.app.auth.homeURL)
  }

  // This is an authenticated route but the user
  // is not logged in so redirect to the login page.
  if (!guest && !authStore.isLoggedIn) {
    return router.push({ name: 'login' })
  }

  next()
}
