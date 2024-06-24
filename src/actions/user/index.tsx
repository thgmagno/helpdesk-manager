'use server'

import prisma from '@/lib/prisma'
import { UserRelation } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function create() {}

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

export async function manageRequest(
  relation: UserRelation,
  accept: boolean,
  role: 'PROVIDER' | 'CLIENT',
) {
  if (accept) {
    await prisma.userRelation.update({
      where: { id: relation.id },
      data: { clientAllow: true },
    })
  } else {
    await prisma.userRelation.delete({
      where: { id: relation.id },
    })
  }

  revalidatePath('/')
}
