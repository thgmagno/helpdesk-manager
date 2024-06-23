'use client'

import { actions } from '@/actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FiX } from 'react-icons/fi'
import { Input } from '../input'
import { ButtonFormSubmit } from './ButtonFormSubmit'
import { useFormState } from 'react-dom'

export function SearchCustomers() {
  const [formState, action] = useFormState(actions.providers.searchCustomer, {
    errors: {},
  })

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isModalOpen = searchParams.get('modal') === 'search-customers'

  return (
    <>
      <button
        onClick={() => replace(`${pathname}?modal=search-customers`)}
        className="flex items-center gap-2 rounded bg-success p-2 text-white"
      >
        Buscar
      </button>

      {isModalOpen && (
        <div className="absolute left-0 right-0 top-0 flex h-full items-center justify-center bg-neutral-900/50">
          <div className="flex flex-col space-y-5 rounded-xl bg-white p-3 md:p-5">
            <div className="flex items-center justify-between text-muted">
              <h1 className="text-lg">Pesquisar clientes</h1>
              <FiX
                onClick={() => replace(pathname)}
                size={20}
                className="ml-10 cursor-pointer"
              />
            </div>

            <form action={action} className="w-[300px]">
              <Input
                name="email"
                isInvalid={!!formState?.errors.email}
                errorMessage={formState?.errors.email}
                placeholder="Endereço de e-mail"
              />
              {formState?.errors._form && (
                <p className="pr-2 text-sm text-danger">
                  {formState.errors._form}
                </p>
              )}
              <ButtonFormSubmit title="Pesquisar" className="w-full" />
            </form>
          </div>
        </div>
      )}
    </>
  )
}
