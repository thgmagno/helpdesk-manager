import type { TicketType } from '@/utils/ticket.type'
import { FiFile, FiTrash2 } from 'react-icons/fi'

type StatusType = 'open' | 'inProgress' | 'closed' | 'cancelled'

export function TicketItem({ ticket }: { ticket: TicketType }) {
  const statusMapping = {
    open: <span className="text-secondary">Aberto</span>,
    inProgress: <span className="text-warning">Em andamento</span>,
    closed: <span className="text-muted">Fechado</span>,
    cancelled: <span className="text-neutral-500">Cancelado</span>,
  }

  return (
    <>
      <tr className="h-16 border-b-2 border-b-muted/30 bg-slate-100 duration-300 last:border-b-0 hover:bg-slate-200">
        <td className="pl-1">{ticket.customer?.name ?? 'Não definido'}</td>
        <td className="hidden md:table-cell">
          {ticket.createdAt.toLocaleDateString('pt-br', { dateStyle: 'short' })}
        </td>
        <td>{statusMapping[ticket.status as StatusType]}</td>
        <td>
          <button>
            <FiFile size={24} className="text-secondary" />
          </button>
          <button>
            <FiTrash2 size={24} className="text-danger" />
          </button>
        </td>
      </tr>
    </>
  )
}
