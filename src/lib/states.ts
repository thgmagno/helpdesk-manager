import { User } from '@prisma/client'

export interface SearchCustomerFormState {
  data: {
    customers?: User[]
  }
  errors: {
    searchTerm?: string[]
    _form?: string
  }
}
