'use client'

import { CustomerType } from '@/utils/customer.type'
import { FiTrash2 } from 'react-icons/fi'
import { actions } from '@/actions'

export function CardCustomer({ customer }: { customer: CustomerType }) {
  const Row = ({ label, value }: { label: string; value: string }) => (
    <h2>
      <b>{label}:</b> {value}
    </h2>
  )

  async function handleDeleteCustomer() {
    const { count, ticketsName } = await actions.customer.getOpenTickets(
      customer.id,
    )

    if (count >= 1) {
      return alert(
        `Não pode ser deletado, pois possui ${count} chamado(s) em aberto:\n${ticketsName.map((ticket) => `- ${ticket}`).join('\n')}`,
      )
    }

    try {
      await actions.customer.del(customer.id)
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      }
    }
  }

  return (
    <article className="flex flex-col rounded border p-2 shadow-sm">
      <Row label="Nome" value={customer.name} />
      <Row label="Telefone" value={customer.phone} />
      <Row label="E-mail" value={customer.email} />
      <button
        onClick={handleDeleteCustomer}
        className="mt-2 flex items-center justify-center gap-1.5 rounded bg-danger px-4 py-1 font-medium text-white active:scale-95"
      >
        <FiTrash2 size={20} /> Deletar
      </button>
    </article>
  )
}
