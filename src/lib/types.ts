export type UserType = {
  user: {
    id: string
    name: string
    email: string
    image?: string | undefined
    role: 'PROVIDER' | 'CLIENT'
  }
}
