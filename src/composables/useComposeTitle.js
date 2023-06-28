import { computed } from 'vue'

export function useComposeTitle(updating, suffix) {
  const createTitle = `Create ${suffix}`
  const title = computed(() => {
    return updating.value ? `Edit ${suffix}` : createTitle
  })
  const action = computed(() => {
    return updating.value ? `Save changes` : createTitle
  })

  return { title, action }
}
