export interface CustomerType {
  id: string
  name: string
  phone: string
  email: string
  address: string | null
  createdAt: Date
  updatedAt: Date
  userId: string | null
  tickets: {
    id: string
    name: string
    description: string
    status: string
    createdAt: Date
    updatedAt: Date
    customerId: string | null
    userId: string | null
  }[]
}
