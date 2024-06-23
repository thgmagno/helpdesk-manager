import { SearchCustomers } from '@/components/button/SearchCustomers'
import { Container } from '@/components/container'

export default function Customers() {
  return (
    <Container>
      <div className="flex h-11 items-center justify-between">
        <h1 className="text-lg font-medium md:text-xl">Meus clientes</h1>
        <SearchCustomers />
      </div>
    </Container>
  )
}
