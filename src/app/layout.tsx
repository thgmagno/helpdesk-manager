import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header'
import { Providers } from './providers'
import './globals.css'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Helpdesk - Manager',
  description: 'Gerencie seus clientes e atendimentos de forma online e fácil.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const session = await getServerSession(authOptions)

  // if (session?.user.id || session?.user.email) redirect('/dashboard')

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
