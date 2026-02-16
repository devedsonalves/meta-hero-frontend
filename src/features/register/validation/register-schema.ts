import * as yup from 'yup'

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Nome é obrigatório')
    .min(2, 'Nome muito curto'),
  email: yup
    .string()
    .trim()
    .required('E-mail é obrigatório')
    .email('E-mail inválido'),
  confirmEmail: yup
    .string()
    .trim()
    .required('Confirmar e-mail é obrigatório')
    .oneOf([yup.ref('email')], 'E-mails não coincidem'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha muito curta'),
})

export type RegisterSchema = yup.InferType<typeof registerSchema>
