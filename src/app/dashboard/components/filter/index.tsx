'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'

export function Filter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams)
    const status = e.target.value

    if (status === '') {
      params.delete('status')
    } else {
      params.set('status', status)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <section
      onChange={handleChange}
      className="mb-5 inline-flex items-center gap-2 rounded-md border p-2"
    >
      <label>Filtrar por:</label>
      <select className="outline-none">
        <option value="">Abertos</option>
        <option value="all">Todos</option>
        <option value="inProgress">Em andamento</option>
        <option value="closed">Fechado</option>
        <option value="cancelled">Cancelado</option>
      </select>
    </section>
  )
}
