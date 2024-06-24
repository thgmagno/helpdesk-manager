'use client'

import { actions } from '@/actions'
import { useFormState } from 'react-dom'
import { Input } from '../input'
import { Container } from '../container'

interface Props {
  role: 'PROVIDER' | 'CLIENT'
}

export function CreateTicketForm({ role }: Props) {
  const [formState, action] = useFormState(actions.user.createTicket, {
    errors: {},
  })

  return (
    <Container>
      <form action="" className="flex flex-col space-y-3">
        <Input
          name="subject"
          label="Assunto:"
          placeholder="Assunto do chamado"
          errorMessage={formState?.errors.subject}
          isInvalid={!!formState?.errors.subject}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="description">Descrição:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Nos ajude a entender melhor a situação"
            className={`h-24 w-full resize-none rounded-md border p-2 shadow-sm outline-none ${formState?.errors.description ? 'border-danger' : 'border-muted'}`}
          ></textarea>
          {formState?.errors.description && (
            <p className="text-sm text-danger">
              {formState.errors.description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description">
            {role === 'PROVIDER'
              ? 'Selecione o cliente'
              : 'Selecione a empresa'}
            :
          </label>
          <select name="recipient" id="recipient"></select>
          {formState?.errors.description && (
            <p className="text-sm text-danger">
              {formState.errors.description}
            </p>
          )}
        </div>
      </form>
    </Container>
  )
}
