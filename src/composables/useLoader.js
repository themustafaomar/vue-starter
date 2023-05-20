import { useStore } from 'vuex'

export const useLoader = () => {
  const { commit } = useStore()

  return {
    markAsLoaded: () => commit('loaded'),
    markAsLoading: () => commit('loading'),
  }
}
