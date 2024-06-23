import { Container } from '@/components/container'
import Link from 'next/link'
import { NewCustomerForm } from '../components/form'

export default function NewCustomer() {
  return (
    <Container>
      <main className="mb-2 mt-9 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">Novo cliente</h1>
          <Link
            href="/dashboard/customer"
            className="rounded bg-muted px-4 py-2 text-white"
          >
            Voltar
          </Link>
        </div>

        <NewCustomerForm />
      </main>
    </Container>
  )
}
