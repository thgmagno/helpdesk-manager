'use server'

import prisma from '@/lib/prisma'

export async function findMyRelations(user: {
  id: string
  name: string
  email: string
  image?: string | undefined
  role: 'PROVIDER' | 'CLIENT'
}) {
  return prisma.userRelation.findMany({
    where: {
      clientId: user.id,
    },
    include: {
      provider: true,
    },
  })
}
