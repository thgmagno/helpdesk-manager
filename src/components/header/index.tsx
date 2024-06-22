'use client'

import Link from 'next/link'
import { FiUser, FiLogOut, FiLoader, FiLock } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export function Header() {
  const { data, status } = useSession()

  async function handleSignIn() {
    await signIn()
  }

  async function handleSignOut() {
    await signOut()
  }

  return (
    <header className="flex h-20 w-full items-center bg-white px-2 py-4 shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="pl-1 text-2xl font-bold duration-300 hover:tracking-wider">
            <span className="text-primary">Helpdesk</span>{' '}
            <span className="text-secondary">Manager</span>
          </h1>
        </Link>

        {status === 'loading' && (
          <FiLoader size={26} className="animate-spin text-muted" />
        )}

        {status === 'unauthenticated' && (
          <button onClick={handleSignIn}>
            <FiLock size={26} className="text-muted" />
          </button>
        )}

        {status === 'authenticated' && (
          <div className="flex items-center space-x-5">
            <Link href="/dashboard">
              {data.user.image ? (
                <Image
                  src={data.user.image}
                  height={28}
                  width={28}
                  className="rounded-full hover:ring-2"
                  alt={`Imagem do usuário ${data.user.name}`}
                />
              ) : (
                <FiUser
                  size={26}
                  className="rounded-full text-muted hover:ring-2"
                />
              )}
            </Link>
            <button onClick={handleSignOut}>
              <FiLogOut size={26} className="text-danger" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
