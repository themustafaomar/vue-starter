import * as yup from 'yup'

// prettier-ignore
export const validationSchema = yup.object({
  name: yup.string()
    .min(5)
    .required()
    .label('Name'),
})
