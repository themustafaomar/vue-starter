import { computed } from 'vue'
import { useTheme } from 'vuetify'

export function useIsDark() {
  const { current } = useTheme()
  const isDark = computed(() => current.value.dark)

  return isDark
}
