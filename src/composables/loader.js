import { useStore } from 'vuex'

export const useLoader = () => {
  const store = useStore()

  return {
    markAsLoaded: () => store.commit('loaded'),
  }
}
