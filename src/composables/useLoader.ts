import { useAppStore } from '@/stores/app'

type LoaderMethods = {
  markAsLoaded: Function
  markAsLoading: Function
}

export const useLoader = (): LoaderMethods => {
  const { loading, loaded } = useAppStore()

  return {
    markAsLoaded: () => loaded(),
    markAsLoading: () => loading(),
  }
}
