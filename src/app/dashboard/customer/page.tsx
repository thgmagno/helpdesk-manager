import { Container } from '@/components/container'
import Link from 'next/link'
import { CardCustomer } from './components/card'
import { actions } from '@/actions'

export default async function CustomerPage() {
  const customers = await actions.customer.findMany()

  return (
    <Container>
      <main className="mb-2 mt-9">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="flex items-center rounded bg-success p-2 text-white shadow-sm active:scale-95"
          >
            Novo cliente
          </Link>
        </div>
      </main>

      <section className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {customers.map((customer) => (
          <CardCustomer key={customer.id} customer={customer} />
        ))}
      </section>

      {customers.length === 0 && (
        <h1 className="my-5 text-center text-lg font-medium text-muted">
          Você ainda não possui nenhum cliente cadastrado.
        </h1>
      )}
    </Container>
  )
}
