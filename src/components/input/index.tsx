'use client'

import { HTMLInputTypeAttribute } from 'react'

interface InputProps {
  name: string
  placeholder: string
  isInvalid?: boolean
  errorMessage?: string[]
  type?: HTMLInputTypeAttribute
}

export function Input({
  name,
  type,
  placeholder,
  errorMessage,
  isInvalid,
}: InputProps) {
  return (
    <>
      <input
        type={type ?? 'text'}
        placeholder={placeholder}
        name={name}
        className={`border- h-11 w-full rounded-md border-2 px-2 shadow-sm outline-none ${isInvalid ? 'border-danger' : 'border-muted'}`}
      />
      {errorMessage && <p className="my-1 text-danger">{errorMessage}</p>}
    </>
  )
}
