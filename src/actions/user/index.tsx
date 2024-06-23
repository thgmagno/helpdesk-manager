'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function create() {}

export async function changeRole(userId: string, role: 'PROVIDER' | 'CLIENT') {
  return prisma.user
    .update({
      where: { id: userId },
      data: { role },
    })
    .then(() => revalidatePath('/'))
}
