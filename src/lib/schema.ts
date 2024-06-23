import { z } from 'zod'

export const SearchCustomersSchema = z.object({
  email: z.string().email('E-mail inválido'),
})
