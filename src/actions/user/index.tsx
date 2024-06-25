'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { TicketSchema } from '@/lib/schema'
import { TicketFormState } from '@/lib/states'
import { UserRelation } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTicket(
  formState: TicketFormState,
  formData: FormData,
): Promise<TicketFormState> {
  const session = await getServerSession(authOptions)
  if (!session) return { errors: { _form: 'Não autorizado' } }

  const parsed = TicketSchema.safeParse({
    subject: formData.get('subject'),
    description: formData.get('description'),
    recipient: formData.get('recipient'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    if (session.user.role === 'CLIENT') {
      await prisma.ticket.create({
        data: {
          subject: parsed.data.subject,
          description: parsed.data.description,
          clientId: session.user.id,
          providerId: parsed.data.recipient,
        },
      })
    }

    if (session.user.role === 'PROVIDER') {
      await prisma.ticket.create({
        data: {
          subject: parsed.data.subject,
          description: parsed.data.description,
          clientId: parsed.data.recipient,
          providerId: session.user.id,
        },
      })
    }
  } catch (err) {
    return {
      errors: { _form: 'Não foi possível criar o chamado, tente novamente' },
    }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function changeRole(userId: string, role: 'PROVIDER' | 'CLIENT') {
  return prisma.user
    .update({
      where: { id: userId },
      data: { role },
    })
    .then(() => {
      revalidatePath('/')
      redirect('/dashboard')
    })
}

export async function manageRequest(relation: UserRelation, accept: boolean) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  if (accept) {
    if (session.user.role === 'CLIENT') {
      await prisma.userRelation.update({
        where: { id: relation.id },
        data: { clientAllow: true },
      })
    }

    if (session.user.role === 'PROVIDER') {
      await prisma.userRelation.update({
        where: { id: relation.id },
        data: { providerAllow: true },
      })
    }
  } else {
    await prisma.userRelation.delete({
      where: { id: relation.id },
    })
  }

  revalidatePath('/')
}

export async function findAllTickets() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  return prisma.ticket.findMany({
    where: {
      OR: [{ clientId: session.user.id }, { providerId: session.user.id }],
    },
  })
}

// export async function findOneTickets() {
//   const session = await getServerSession(authOptions)
//   if (!session) return { errors: { _form: 'Não autorizado' } }
// }
