import { actions } from '@/actions'
import { Container } from '@/components/container'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'

export default async function Dashboard() {
  const tickets = await actions.user.findAllTickets()

  return (
    <Container>
      <main className="mb-2 mt-9">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new-ticket"
            className="rounded bg-success p-2 text-white"
          >
            Cadastrar
          </Link>
        </div>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="pl-1 text-left font-medium uppercase">Cliente</th>
              <th className="hidden text-left font-medium uppercase md:table-cell">
                Data cadastro
              </th>
              <th className="text-left font-medium uppercase">Status</th>
              <th className="text-left font-medium uppercase">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => (
              <tr>
                <td>{ticket.clientId}</td>
                <td>{formatDate(ticket.createdAt)}</td>
                <td>{ticket.status}</td>
                <td>
                  <FiChevronRight size={20} />
                </td>
              </tr>
            ))}
            {tickets?.length === 0 && (
              <tr>
                <td colSpan={4} className="h-24 text-center text-muted">
                  Nenhum chamado registrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </Container>
  )
}
