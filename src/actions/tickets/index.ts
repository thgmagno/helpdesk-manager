'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { TicketSchema } from '@/lib/schema'
import { TicketFormState } from '@/lib/states'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function create(
  formState: TicketFormState,
  formData: FormData,
): Promise<TicketFormState> {
  const session = await getServerSession(authOptions)

  const parsed = TicketSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    customerId: formData.get('customer'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.ticket.create({
      data: {
        name: parsed.data.name,
        description: parsed.data.description,
        customerId: parsed.data.customerId,
        userId: session?.user.id as string,
        status: 'open',
      },
    })
  } catch (err) {
    return { errors: { _form: 'Failed create new ticket' } }
  }

  revalidatePath('/')
  redirect('/dashboard')
}

export async function findMany(searchStatus?: string) {
  const session = await getServerSession(authOptions)

  return prisma.ticket.findMany({
    where: {
      userId: session?.user.id as string,
      ...(searchStatus !== 'all' && { status: searchStatus }),
    },
    include: { customer: { select: { name: true } } },
  })
}

export async function del(ticketId: string) {
  try {
    await prisma.ticket.delete({
      where: { id: ticketId },
    })
  } catch (err) {
    return { errors: { _form: 'Failed delete ticket' } }
  }

  revalidatePath('/')
}
