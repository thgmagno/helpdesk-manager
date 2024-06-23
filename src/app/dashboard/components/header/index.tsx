import { Container } from '@/components/container'
import Link from 'next/link'

export function DashboardHeader() {
  const HeaderItem = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} className="text-white duration-300 hover:font-bold">
      {label}
    </Link>
  )

  return (
    <Container>
      <header className="my-4 flex w-full items-center space-x-4 rounded bg-secondary p-3">
        <HeaderItem href="/dashboard" label="Chamados" />
        <HeaderItem href="/dashboard/customer" label="Clientes" />
      </header>
    </Container>
  )
}
