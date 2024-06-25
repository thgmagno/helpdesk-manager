import { User } from '@prisma/client'

export type UserType = {
  user: {
    id: string
    name: string
    email: string
    image?: string | undefined
    role: 'PROVIDER' | 'CLIENT'
  }
}

export type CustomerRelationType = {
  id: string
  providerId: string
  clientId: string
  providerAllow: boolean
  clientAllow: boolean
  createdAt: Date
  updatedAt: Date
} & { provider: User }

export type ProviderRelationType = {
  id: string
  providerId: string
  clientId: string
  providerAllow: boolean
  clientAllow: boolean
  createdAt: Date
  updatedAt: Date
} & { client: User }
