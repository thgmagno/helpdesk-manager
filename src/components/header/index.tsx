import Link from 'next/link'
import { FiUser, FiLogOut } from 'react-icons/fi'

export function Header() {
  return (
    <header className="flex h-20 w-full items-center bg-white px-2 py-4 shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="pl-1 text-2xl font-bold duration-300 hover:tracking-wider">
            <span className="text-primary">Helpdesk</span>{' '}
            <span className="text-secondary">Manager</span>
          </h1>
        </Link>

        <div className="flex items-baseline space-x-5">
          <Link href="/dashboard">
            <FiUser size={26} className="text-muted" />
          </Link>
          <button>
            <FiLogOut size={26} className="text-danger" />
          </button>
        </div>
      </div>
    </header>
  )
}
