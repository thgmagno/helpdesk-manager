import { actions } from '@/actions'
import { CreateTicketForm } from '@/components/form/CreateTicketForm'
import { authOptions } from '@/lib/auth'
import { CustomerRelationType, ProviderRelationType } from '@/lib/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function NewTicketPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/dashboard')

  const customerRelation: CustomerRelationType[] = []
  const providerRelation: ProviderRelationType[] = []

  if (session.user.role === 'PROVIDER') {
    const relations = await actions.providers.findMyRelations(session.user)
    providerRelation.push(...relations)
  }

  if (session.user.role === 'CLIENT') {
    const relations = await actions.customers.findMyRelations(session.user)
    customerRelation.push(...relations)
  }

  return (
    <>
      <CreateTicketForm
        role={session.user.role}
        customerRelation={customerRelation}
        providerRelation={providerRelation}
      />
    </>
  )
}
