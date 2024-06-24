import { z } from 'zod'

export const SearchCustomersSchema = z.object({
  searchTerm: z.string().min(1, 'Digite um termo para buscar'),
})
