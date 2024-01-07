import axios from 'axios'
import router from '../router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

// Axios instance
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withXSRFToken: true,
  withCredentials: true,
})

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status
    const { notify } = useAppStore()
    const { flush } = useAuthStore()

    // Sometimes we don't have an error response
    // most likely this is happening with CORS errors and network errors.
    if (typeof statusCode === 'undefined') {
      notify({
        message: `${error.message} - [${error.code}]`,
        color: 'red',
      })
    }

    // Unauthorized user
    // https://laravel.com/docs/10.x/sanctum#logging-in
    if (statusCode === 401 || statusCode === 419) {
      flush(() => {
        router.push('/login')
      })
    }

    // Show an error with the m the common error
    if (statusCode === 422) {
      notify({
        message: error.response.data.message,
        color: 'red',
      })
    }

    // Page not found, too many attempts (requests) and server errors
    if (statusCode === 404 || statusCode === 429 || statusCode >= 500) {
      notify({
        // prettier-ignore
        message: error.response?.data.message || error.response.statusText || error.message || error.code,
        color: 'red',
      })
    }

    return Promise.reject(error)
  }
)

export default instance
