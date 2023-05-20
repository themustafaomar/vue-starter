import { object, string, number, ref } from 'yup'

// Login validation
export const loginValidation = object({
  email: string().required().email().label('Eamil'),
  password: string().required().label('Password'),
})

// Register validation
export const registerValidation = object({
  name: string().min(5).required().label('Name'),
  email: string().required().email().label('Eamil'),
  password: string().min(8).required().label('Password'),
  type: number().equals([1, 2, 3], 'Account type is invalid'),
})

// Forgot password validation
export const forgotPasswordValidation = object({
  email: string().required().email().label('Eamil'),
})

// Reset password validation
export const resetPasswordValidation = object({
  email: string().required().email().label('Eamil'),
  password: string().min(8).required().label('Password'),
  password_confirmation: string()
    .required()
    .min(8)
    .oneOf([ref('password'), null], 'Passwords must match')
    .required()
    .label('Password'),
})
