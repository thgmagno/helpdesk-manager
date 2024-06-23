import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/app/dashboard/components/header'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) redirect('/')

  return (
    <>
      <DashboardHeader />
      {children}
    </>
  )
}
