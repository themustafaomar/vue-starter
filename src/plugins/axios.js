import axios from 'axios'
import store from '../store'
import router from '@/router'

// Axios instance
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/`,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
})

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status

    // Sometimes we don't have an error response
    // most likely this is happening with CORS errors and network errors.
    if (typeof statusCode === 'undefined') {
      store.commit('app/notify', {
        message: `${error.message} - [${error.code}]`,
        color: 'red',
      })
    }

    // Unauthorized user
    // https://laravel.com/docs/10.x/sanctum#logging-in
    if (statusCode === 401 || statusCode === 419) {
      store.commit('auth/logout')
      router.push('/login').then(() => {
        store.commit('app/notify', {
          message: error.response.data.message,
          color: 'red',
        })
      })
    }

    // Page not found, too many attempts (requests) and server errors
    if (statusCode === 404 || statusCode === 429 || statusCode >= 500) {
      store.commit('app/notify', {
        // prettier-ignore
        message: error.response?.data.message || error.response.statusText || error.message || error.code,
        color: 'red',
      })
    }

    return Promise.reject(error)
  }
)

export default instance
