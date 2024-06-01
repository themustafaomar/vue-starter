import { useAuthStore } from '@/stores/auth'

export default ({ redirect, guard }) => {
  const authStore = useAuthStore()

  // This is an authenticated route but the user
  // is not logged in so redirect to the login page.
  if (guard !== 'guest' && !authStore.isLoggedIn) {
    return redirect('/login')
  }

  // This is a guest route, and the user is authorized
  // let's redirect him/her to the dashboard home page.
  if (guard === 'guest' && authStore.isLoggedIn) {
    return redirect('/dashboard')
  }
}
