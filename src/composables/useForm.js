import { reactive } from 'vue'
import { Form } from 'vform'

export function useForm(data) {
  return reactive(new Form(data))
}
