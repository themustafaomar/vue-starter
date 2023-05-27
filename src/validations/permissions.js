import { object, string } from 'yup'

// Create permission validation
export const createPermissionValidation = object({
  name: string().required().min(5).label('Name'),
})
