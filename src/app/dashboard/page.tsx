import { Container } from '@/components/container'

export default async function Dashboard() {
  return (
    <Container>
      <main className="mb-2 mt-9">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
        </div>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="pl-1 text-left font-medium uppercase">Cliente</th>
              <th className="hidden text-left font-medium uppercase md:table-cell">
                Data cadastro
              </th>
              <th className="text-left font-medium uppercase">Status</th>
              <th className="text-left font-medium uppercase">#</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </main>
    </Container>
  )
}
