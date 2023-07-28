import { reactive } from 'vue'
import { Form } from 'vform'

export function useForm(data: any) {
  return reactive(new Form(data))
}
