'use client'

import { actions } from '@/actions'
import { Input } from '@/components/input'
import { CustomerType } from '@/utils/customer.type'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { FiPlus } from 'react-icons/fi'

interface Props {
  customers: CustomerType[]
}

export function CreateTicketForm({ customers }: Props) {
  const [formState, action] = useFormState(actions.tickets.create, {
    errors: {},
  })

  return (
    <form action={action} className="mt-6 flex flex-col">
      <label className="mb-1 text-lg font-medium">Nome do chamado</label>
      <Input
        name="name"
        placeholder="Título"
        isInvalid={!!formState?.errors.name}
        errorMessage={formState?.errors.name}
      />

      <label className="mb-1 text-lg font-medium">Descrição</label>
      <textarea
        name="description"
        placeholder="Descreva o problema..."
        className="mb-2 h-24 w-full resize-none rounded-md border-2 p-2"
        required
      ></textarea>

      <label className="mb-1 text-lg font-medium">Selecione o cliente</label>
      <div className="flex gap-2">
        <select
          name="customer"
          className="mb-2 h-11 w-full flex-1 rounded-md border-2 p-2"
          required
          defaultValue={''}
        >
          <option disabled value="">
            Selecione
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <Link href="/dashboard/customer/new">
          <FiPlus
            size={30}
            className="translate-y-2 rounded bg-success text-white"
          />
        </Link>
      </div>

      <button
        disabled={!customers.length}
        type="submit"
        className="my-4 h-11 rounded bg-success px-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Cadastrar
      </button>
    </form>
  )
}
