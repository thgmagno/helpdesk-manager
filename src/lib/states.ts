import { User } from '@prisma/client'

export interface TicketFormState {
  errors: {
    recipient?: string[]
    subject?: string[]
    description?: string[]
    _form?: string
  }
}

export interface SearchCustomerFormState {
  data: {
    customers?: User[]
  }
  errors: {
    searchTerm?: string[]
    _form?: string
  }
}
