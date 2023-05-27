import { useAppStore } from '@/stores/app'

export const useLoader = () => {
  const { loading, loaded } = useAppStore()

  return {
    markAsLoaded: () => loaded(),
    markAsLoading: () => loading(),
  }
}
