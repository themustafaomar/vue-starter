import { useAuthStore } from '@/stores/auth'

export default ({ router, next, guest }) => {
  const authStore = useAuthStore()

  // This is an authenticated route but the user
  // is not logged in so redirect to the login page.
  if (!guest && !authStore.isLoggedIn) {
    return router.push('/login')
  }

  // This is a guest route, and the user is authorized
  // let's redirect him/her to the dashboard home page.
  if (guest && authStore.isLoggedIn) {
    return router.push('/dashboard')
  }

  next()
}
