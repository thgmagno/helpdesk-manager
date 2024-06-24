'use client'

import { actions } from '@/actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FiPlusCircle, FiX } from 'react-icons/fi'
import { Input } from '../input'
import { ButtonFormSubmit } from './ButtonFormSubmit'
import { useFormState } from 'react-dom'
import { User } from '@prisma/client'
import { useState } from 'react'

export function SearchCustomers() {
  const [formState, action] = useFormState(actions.providers.searchCustomer, {
    data: {},
    errors: {},
  })

  const [response, setResponse] = useState<{
    success: boolean
    message: string
  }>({
    success: false,
    message: '',
  })

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isModalOpen = searchParams.get('modal') === 'search-customers'

  async function handleAddCustomer(customer: User) {
    const response = await actions.providers.addCustomer(customer)

    response && setResponse(response)
  }

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
          <div className="flex max-w-[96%] flex-col space-y-5 rounded-xl bg-white p-3 md:p-5">
            <div className="flex items-center justify-between text-muted">
              <h1 className="text-lg">Pesquisar clientes</h1>
              <FiX
                onClick={() => replace(pathname)}
                size={20}
                className="ml-10 cursor-pointer"
              />
            </div>

            <form action={action} className="mx-auto w-[350px] max-w-[98%]">
              <Input
                name="searchTerm"
                isInvalid={!!formState?.errors.searchTerm}
                errorMessage={formState?.errors.searchTerm}
                placeholder="Endereço de e-mail ou nome"
              />
              {formState?.errors._form && (
                <p className="pr-2 text-sm text-danger">
                  {formState.errors._form}
                </p>
              )}

              {formState?.data?.customers &&
                formState.data.customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="my-3 flex items-center justify-between pr-1"
                  >
                    <div className="flex flex-col text-sm">
                      <span>
                        <b>Nome:</b> {customer.name}
                      </span>
                      <span>
                        <b>E-mail:</b> {customer.email}
                      </span>
                    </div>
                    <FiPlusCircle
                      onClick={() => handleAddCustomer(customer)}
                      size={18}
                      className="cursor-pointer rounded-full text-success ring-sky-400 duration-300 hover:ring-2 active:scale-90"
                    />
                  </div>
                ))}

              {response.message && response.success ? (
                <p className="pr-2 text-sm text-success">{response.message}</p>
              ) : (
                <p className="pr-2 text-sm text-danger">{response.message}</p>
              )}

              <ButtonFormSubmit title="Pesquisar" className="w-full" />
            </form>
          </div>
        </div>
      )}
    </>
  )
}
