export interface TicketType {
  id: string
  name: string
  description: string
  status: string
  createdAt: Date
  updatedAt: Date
  customerId: string | null
  userId: string | null
  customer: {
    name: string
  } | null
}
