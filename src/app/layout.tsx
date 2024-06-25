import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Header } from '@/components/header'
import { Providers } from './providers'
import './globals.css'

const inter = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Helpdesk - Manager',
  description: 'Gerencie seus clientes e atendimentos de forma online e fácil.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
