'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { SearchCustomersSchema } from '@/lib/schema'
import { SearchCustomerFormState } from '@/lib/states'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function searchCustomer(
  formState: SearchCustomerFormState,
  formData: FormData,
): Promise<SearchCustomerFormState> {
  const session = await getServerSession(authOptions)

  const parsed = SearchCustomersSchema.safeParse({
    email: formData.get('email'),
  })

  if (!session) {
    return { errors: { _form: 'Não foi possível realizar a busca' } }
  }

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  if (parsed.data.email === session?.user.email) {
    return {
      errors: { _form: 'Não é possível adicionar a si mesmo' },
    }
  }

  try {
    const customer = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    })

    if (!customer) {
      return { errors: { _form: 'Nenhum usuário encontrado para este e-mail' } }
    }

    const added = await addCustomer(customer, session.user.id)

    if (!added.success) {
      return { errors: { _form: added.message } }
    }
  } catch (err) {
    return {
      errors: { _form: 'Não foi possível realizar a busca' },
    }
  }

  revalidatePath('/')
  redirect('/dashboard/customers')
}

async function addCustomer(customer: User, providerId: string) {
  const relationAlreadyExists = await prisma.userRelation.count({
    where: { providerId, clientId: customer.id },
  })

  if (relationAlreadyExists) {
    return { success: false, message: 'Relação já existe' }
  }

  await prisma.userRelation.create({
    data: {
      providerId,
      clientId: customer.id,
      providerAllow: true,
    },
  })

  return { success: true, message: '' }
}
