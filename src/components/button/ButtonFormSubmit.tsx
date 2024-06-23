'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { FiLoader } from 'react-icons/fi'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function ButtonFormSubmit({ title, ...rest }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      {...rest}
      disabled={pending}
      type="submit"
      className={`my-4 h-11 rounded bg-success px-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 ${rest.className}`}
    >
      {pending ? (
        <span className="flex gap-2">
          <FiLoader size={20} className="animate-spin" />
          Carregando...
        </span>
      ) : (
        title
      )}
    </button>
  )
}
