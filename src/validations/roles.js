import { object, string } from 'yup'

// Create role validation
export const createRoleValidation = object({
  name: string().required().min(5).label('Role Name'),
})
