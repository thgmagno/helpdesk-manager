'use client'

import { actions } from '@/actions'
import { useFormState } from 'react-dom'
import { Input } from '../input'
import { Container } from '../container'
import { CustomerRelationType, ProviderRelationType } from '@/lib/types'
import { ButtonFormSubmit } from '../button/ButtonFormSubmit'

interface Props {
  role: 'PROVIDER' | 'CLIENT'
  customerRelation?: CustomerRelationType[]
  providerRelation?: ProviderRelationType[]
}

export function CreateTicketForm({
  role,
  customerRelation,
  providerRelation,
}: Props) {
  const [formState, action] = useFormState(actions.user.createTicket, {
    errors: {},
  })

  return (
    <Container>
      <form action={action} className="mb-24 flex flex-col space-y-3">
        <Input
          name="subject"
          label="Assunto:"
          placeholder="Sobre o que você quer falar"
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
          <select
            name="recipient"
            id="recipient"
            className={`h-11 w-full rounded-md border p-2 shadow-sm outline-none ${formState?.errors.recipient ? 'border-danger' : 'border-muted'}`}
          >
            <option value="">Selecionar</option>
            {role === 'CLIENT' &&
              customerRelation
                ?.filter((item) => item.providerAllow)
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.provider.name}
                  </option>
                ))}
            {role === 'PROVIDER' &&
              providerRelation
                ?.filter((item) => item.clientAllow)
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.client.name}
                  </option>
                ))}
          </select>
          {formState?.errors.recipient && (
            <p className="text-sm text-danger">{formState.errors.recipient}</p>
          )}
        </div>

        <ButtonFormSubmit title="Criar chamado" />
      </form>
    </Container>
  )
}
