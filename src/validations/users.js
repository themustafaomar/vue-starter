import { object, string } from 'yup'

// Create user validation
export const composeUserValidation = object({
  name: string().required().min(5).max(100).label('Name'),
  email: string().required().email().label('Eamil'),
  password: string().min(8),
})
