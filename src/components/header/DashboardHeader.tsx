import Link from 'next/link'
import { Container } from '../container'
import { ChangeRole } from '../button/ChangeRole'
import { UserType } from '@/lib/types'

export function DashboardHeader({ user }: UserType) {
  return (
    <Container>
      <div className="my-5 flex h-11 items-center justify-between rounded bg-secondary p-2 text-white">
        {user.role === 'PROVIDER' && (
          <>
            <div className="flex gap-3">
              <Link href="/dashboard" className="duration-300 hover:font-bold">
                Chamados
              </Link>
              <Link
                href="/dashboard/customers"
                className="duration-300 hover:font-bold"
              >
                Clientes
              </Link>
            </div>
            <ChangeRole userId={user.id} role={user.role} />
          </>
        )}
        {user.role === 'CLIENT' && (
          <>
            <div className="flex gap-3">
              <Link href="/dashboard" className="duration-300 hover:font-bold">
                Chamados
              </Link>
              <Link
                href="/dashboard/providers"
                className="duration-300 hover:font-bold"
              >
                Empresas
              </Link>
            </div>
            <ChangeRole userId={user.id} role={user.role} />
          </>
        )}
      </div>
    </Container>
  )
}
