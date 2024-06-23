'use client'

import { HTMLInputTypeAttribute } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  placeholder: string
  isInvalid?: boolean
  errorMessage?: string[]
  type?: HTMLInputTypeAttribute
}

export function Input({
  name,
  label,
  type,
  placeholder,
  errorMessage,
  isInvalid,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        type={type ?? 'text'}
        placeholder={placeholder}
        name={name}
        id={name}
        className={`h-11 w-full rounded-md border px-2 shadow-sm outline-none ${isInvalid ? 'border-danger' : 'border-muted'} ${rest.className}`}
      />
      {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}
    </div>
  )
}
