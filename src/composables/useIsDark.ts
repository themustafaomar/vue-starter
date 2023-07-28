import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useTheme } from 'vuetify'

export function useIsDark(): ComputedRef {
  const { current } = useTheme()
  const isDark = computed<boolean>(() => current.value.dark)

  return isDark
}
