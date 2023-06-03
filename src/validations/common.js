import { object, string } from 'yup'

// Name rules
const nameRules = (label) => string().required().min(5).max(20).required().label(label)

// Testing validation
export const validation = object({
  first_name: nameRules('First name'),
  last_name: nameRules('Last name'),
})
