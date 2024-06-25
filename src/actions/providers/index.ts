'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { SearchCustomersSchema } from '@/lib/schema'
import { SearchCustomerFormState } from '@/lib/states'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function searchCustomer(
  formState: SearchCustomerFormState,
  formData: FormData,
): Promise<SearchCustomerFormState> {
  const session = await getServerSession(authOptions)

  const parsed = SearchCustomersSchema.safeParse({
    searchTerm: formData.get('searchTerm'),
  })

  if (!session) {
    return { data: {}, errors: { _form: 'Não foi possível realizar a busca' } }
  }

  if (!parsed.success) {
    return { data: {}, errors: parsed.error.flatten().fieldErrors }
  }

  if (parsed.data.searchTerm === session?.user.email) {
    return {
      data: {},
      errors: { _form: 'Não é possível adicionar a si mesmo' },
    }
  }

  let customers: User[] | null = null

  try {
    customers = await prisma.user.findMany({
      where: {
        OR: [
          { email: parsed.data.searchTerm },
          { name: { contains: parsed.data.searchTerm, mode: 'insensitive' } },
        ],
        AND: [{ email: { not: session.user.email } }],
      },
    })

    if (!customers.length) {
      return {
        data: {},
        errors: { _form: 'Nenhum cliente encontrado' },
      }
    }
  } catch (err) {
    return {
      data: {},
      errors: { _form: 'Não foi possível realizar a busca' },
    }
  }

  return { data: { customers }, errors: {} }
}

export async function addCustomer(customer: User) {
  const session = await getServerSession(authOptions)

  if (!session)
    return {
      success: false,
      message: 'Atributos insuficientes para realizar uma busca',
    }

  const relationAlreadyExists = await prisma.userRelation.count({
    where: { providerId: session.user.id, clientId: customer.id },
  })

  if (relationAlreadyExists) {
    return { success: false, message: 'Relação já existe' }
  }

  await prisma.userRelation.create({
    data: {
      providerId: session.user.id,
      clientId: customer.id,
      providerAllow: true,
    },
  })

  revalidatePath('/')
  return { success: true, message: 'Convite enviado com sucesso!' }
}

export async function findMyRelations(user: {
  id: string
  name: string
  email: string
  image?: string | undefined
  role: 'PROVIDER' | 'CLIENT'
}) {
  return prisma.userRelation.findMany({
    where: {
      providerId: user.id,
    },
    include: {
      client: true,
    },
  })
}
