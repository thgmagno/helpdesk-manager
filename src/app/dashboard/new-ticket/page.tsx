import { CreateTicketForm } from '@/components/form/CreateTicketForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function NewTicketPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/dashboard')

  return (
    <>
      <CreateTicketForm role={session.user.role} />
    </>
  )
}
