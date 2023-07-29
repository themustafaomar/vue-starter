import { reactive } from 'vue'
import { Form } from 'vform'

export function useForm(data: object) {
  return reactive(new Form(data))
}
