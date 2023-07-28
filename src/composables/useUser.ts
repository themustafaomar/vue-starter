import { useAuthStore } from '@/stores/auth'

export function useUser(): object {
  return useAuthStore().user
}
