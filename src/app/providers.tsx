'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

export const Providers = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>
}
