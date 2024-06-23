'use client'

import { Input } from '@/components/input'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'
import { ButtonFormSubmit } from '@/components/button/ButtonFormSubmit'

export function NewCustomerForm() {
  const [formState, action] = useFormState(actions.customer.create, {
    errors: {},
  })

  return (
    <form action={action} className="mt-6 flex flex-col">
      <label htmlFor="name" className="mb-1 text-lg font-medium">
        Nome do cliente:
      </label>
      <Input
        name="name"
        placeholder="Digite o nome completo"
        isInvalid={!!formState?.errors.name}
        errorMessage={formState?.errors.name}
      />

      <section className="my-2 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="name" className="mb-1 text-lg font-medium">
            Telefone:
          </label>
          <Input
            name="phone"
            placeholder="(DD) 00000-0000"
            isInvalid={!!formState?.errors.phone}
            errorMessage={formState?.errors.phone}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="name" className="mb-1 text-lg font-medium">
            E-mail:
          </label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o endereço do e-mail"
            isInvalid={!!formState?.errors.email}
            errorMessage={formState?.errors.email}
          />
        </div>
      </section>

      <label htmlFor="name" className="mb-1 text-lg font-medium">
        Endereço: <span className="text-sm text-muted">(opcional)</span>
      </label>
      <Input
        name="address"
        placeholder="Digite o endereço do cliente"
        isInvalid={!!formState?.errors.address}
        errorMessage={formState?.errors.address}
      />

      <ButtonFormSubmit />
    </form>
  )
}
