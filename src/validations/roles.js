import { object, string } from 'yup'

// Create role validation
export const createRoleValidation = object({
  role: string().required().min(5).label('Role'),
})
