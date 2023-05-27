import { useAuthStore } from '@/stores/auth'

export function useUser() {
  return useAuthStore().user
}
