import { z } from 'zod'

export const CustomerSchema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  phone: z.string().refine(
    (val) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(val) ||
        /^\d{2}\s\d{9}$/.test(val) ||
        /^\d{11}$/.test(val)
      )
    },
    {
      message: 'Deve estar no formato (00) 000000000',
    },
  ),
  email: z
    .string()
    .email('Digite um e-mail válido')
    .min(1, 'O campo e-mail é obrigatório.'),
  address: z.string().optional(),
})

export const TicketSchema = z.object({
  name: z.string().min(1, 'Informe um título para o chamado'),
  description: z.string().min(1, 'Preencha a descrição do chamado'),
  customerId: z.string().min(1, 'Selecione o cliente'),
})
