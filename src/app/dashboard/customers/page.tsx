import { actions } from '@/actions'
import { RelationRow } from '@/components/button/ManageRequest'
import { SearchCustomers } from '@/components/button/SearchCustomers'
import { Container } from '@/components/container'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Customers() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/dashboard')

  const relations = await actions.providers.findMyRelations()

  return (
    <Container>
      <div className="flex h-11 items-center justify-between">
        <h1 className="text-lg font-medium md:text-xl">Meus clientes</h1>
        <SearchCustomers />
      </div>

      <section className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {relations?.map((relation) => (
          <RelationRow
            key={relation.id}
            relation={relation}
            role={session.user.role}
          />
        ))}
      </section>
    </Container>
  )
}
