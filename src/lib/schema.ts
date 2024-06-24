import { z } from 'zod'

export const TicketSchema = z.object({
  subject: z.string().min(1, 'Informe o assunto'),
  description: z.string().min(1, 'Preencha a descrição'),
})

export const SearchCustomersSchema = z.object({
  searchTerm: z.string().min(1, 'Digite um termo para buscar'),
})
