import { useStore } from 'vuex'

export function useUser() {
  const store = useStore()

  return store.getters['auth/user']
}
