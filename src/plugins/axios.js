import axios from 'axios'
import store from '../store'
import router from '../router'
import { emitter } from '@/utils'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true
})

// Response interceptor
instance.interceptors.response.use((response) => response, (error) => {
  const statusCode = error.response.status

  if (statusCode === 401) {
    store.commit('auth/FLUSH_USER')
    router.push('/admin/login')
  }

  if (statusCode === 404 || statusCode === 429 || statusCode >= 500) {
    emitter.emit('error', error)
  }

  return Promise.reject(error)
})

export default instance
