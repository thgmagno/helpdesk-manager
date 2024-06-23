'use client'

import { actions } from '@/actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'

interface Props {
  userId: string
  role: 'PROVIDER' | 'CLIENT'
}

export function ChangeRole({ userId, role }: Props) {
  const [roleSelected, setRoleSelected] = useState<'PROVIDER' | 'CLIENT'>(role)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isModalOpen = searchParams.get('modal') === 'role'

  async function handleChange() {
    setLoading(true)
    await actions.user.changeRole(userId, roleSelected)
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={() => replace(`${pathname}?modal=role`)}
        className="flex items-center gap-2 rounded border bg-muted px-2 py-0.5 text-xs"
      >
        <div
          className={`h-2 w-2 animate-pulse rounded-full ${role === 'CLIENT' ? 'bg-sky-400' : 'bg-orange-400'}`}
        />
        {role === 'CLIENT' ? 'Modo cliente' : 'Modo empresa'}
      </button>

      {isModalOpen && (
        <div className="absolute left-0 right-0 top-0 flex h-full items-center justify-center bg-neutral-900/50">
          <div className="flex flex-col space-y-5 rounded-xl bg-white p-3 md:p-5">
            <div className="flex items-center justify-between text-muted">
              <h1 className="text-lg">Alterar perfil</h1>
              <FiX
                onClick={() => replace(pathname)}
                size={20}
                className="cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              {/* PROVIDER */}
              <button
                onClick={() => setRoleSelected('PROVIDER')}
                className={`flex flex-col rounded bg-primary p-2 ${roleSelected === 'PROVIDER' ? 'ring-2 ring-orange-400' : 'opacity-75'}`}
              >
                Empresa
              </button>

              {/* CLIENT */}
              <button
                onClick={() => setRoleSelected('CLIENT')}
                className={`flex flex-col rounded bg-secondary p-2 ${roleSelected === 'CLIENT' ? 'ring-2 ring-sky-400' : 'opacity-75'}`}
              >
                Cliente
              </button>
            </div>

            <button
              onClick={handleChange}
              disabled={roleSelected === role || loading}
              className="w-full rounded border bg-success p-1 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
            >
              {loading ? 'Carregando...' : 'Salvar'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
