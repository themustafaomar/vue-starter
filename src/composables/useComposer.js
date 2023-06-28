import { ref } from 'vue'
import { useLoader } from './useLoader'

export function useComposer() {
  const data = ref(null)
  const isActive = ref(false)

  const _open = () => {
    isActive.value = true
  }
  const _close = () => {
    isActive.value = false
  }
  const _setData = (payload) => {
    data.value = payload
  }

  return {
    isActive,
    data,
    add: () => {
      _open()
      if (data.value) {
        _setData(null)
      }
    },
    update: (payload) => {
      _open()
      _setData(payload)
    },
    markAsCreated(callback) {
      useLoader().markAsLoading()
      if (typeof callback === 'function') {
        callback()
      }
      _close()
      _setData(null)
    },
  }
}
