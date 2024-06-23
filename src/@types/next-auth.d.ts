import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string
      role: 'PROVIDER' | 'CLIENT'
    }
  }

  interface User {
    id: string
    role: 'PROVIDER' | 'CLIENT'
  }
}
