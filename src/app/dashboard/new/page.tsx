import { Container } from '@/components/container'
import Link from 'next/link'
import { CreateTicketForm } from './components/form'
import { actions } from '@/actions'

export default async function DashboardNewPage() {
  const customers = await actions.customer.findMany()

  return (
    <Container>
      <main className="mb-2 mt-9">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Novo chamado</h1>
          <Link href="/dashboard" className="rounded bg-muted p-2 text-white">
            Voltar
          </Link>
        </div>
        <CreateTicketForm customers={customers} />
      </main>
    </Container>
  )
}
