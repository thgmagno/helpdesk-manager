'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { CustomerSchema } from '@/lib/schema'
import { CustomerFormState } from '@/lib/states'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function create(
  formState: CustomerFormState,
  formData: FormData,
): Promise<CustomerFormState> {
  const session = await getServerSession(authOptions)

  const parsed = CustomerSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    address: formData.get('address'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.customer.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: parsed.data.address,
        userId: session?.user.id,
      },
    })
  } catch (error) {
    return { errors: { _form: 'Failed create new customer' } }
  }

  revalidatePath('/')
  redirect('/dashboard/customer')
}

export async function findMany() {
  const session = await getServerSession(authOptions)

  return prisma.customer.findMany({
    where: { userId: session?.user.id as string },
    include: { tickets: true },
  })
}

export async function getOpenTickets(customerId: string) {
  const tickets = await prisma.ticket.findMany({
    where: { customerId, status: 'open' },
  })

  const ticketsName = tickets.map((ticket) => ticket.name)

  return { count: tickets.length, ticketsName }
}

export async function del(customerId: string) {
  try {
    await prisma.customer.delete({
      where: { id: customerId },
    })
  } catch (err) {
    return { errors: { _form: 'Failed delete customer' } }
  }

  revalidatePath('/')
}
