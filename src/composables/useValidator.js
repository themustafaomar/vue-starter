import { computed } from 'vue'
import { useForm } from 'vee-validate'

export function useValidator(validationSchema) {
  const { handleSubmit, meta } = useForm({ validationSchema, validateOnMount: false })
  const isValid = computed(() => meta.value.valid)

  return { isValid, handleSubmit }
}
