import { Container } from '@/components/container'
import Link from 'next/link'
import { TicketItem } from './components/ticket'
import { Filter } from './components/filter'
import { actions } from '@/actions'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { status: string }
}) {
  const searchStatus = searchParams.status ?? 'open'
  const tickets = await actions.tickets.findMany(searchStatus)

  return (
    <Container>
      <main className="mb-2 mt-9">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className="flex items-center rounded bg-success p-2 text-white shadow-sm active:scale-95"
          >
            Novo chamado
          </Link>
        </div>

        <Filter />

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
            {tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} />
            ))}
          </tbody>
        </table>
      </main>
    </Container>
  )
}
