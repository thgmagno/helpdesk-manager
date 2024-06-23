'use client'

import { useFormStatus } from 'react-dom'
import { FiLoader } from 'react-icons/fi'

export function ButtonFormSubmit() {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type="submit"
      className="my-4 h-11 rounded bg-success px-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {pending ? (
        <span className="flex gap-2">
          <FiLoader size={20} className="animate-spin" />
          Carregando...
        </span>
      ) : (
        'Cadastrar'
      )}
    </button>
  )
}
