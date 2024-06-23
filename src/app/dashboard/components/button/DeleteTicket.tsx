'use client'

import { actions } from '@/actions'
import { FiTrash2 } from 'react-icons/fi'

export function DeleteTicket({ ticketId }: { ticketId: string }) {
  return (
    <button onClick={async () => actions.tickets.del(ticketId)}>
      <FiTrash2 size={24} className="text-danger" />
    </button>
  )
}
