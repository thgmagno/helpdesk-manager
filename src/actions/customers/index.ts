'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function findMyRelations() {
  const session = await getServerSession(authOptions)

  if (!session) return null

  return prisma.userRelation.findMany({
    where: {
      clientId: session.user.id,
    },
    include: {
      provider: true,
    },
  })
}
