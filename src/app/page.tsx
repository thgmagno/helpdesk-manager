import Image from 'next/image'
import heroImg from '@/assets/hero.svg'

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
      <h2 className="mb-2 text-2xl font-medium text-[#064790]">
        Gerencie sua empresa
      </h2>
      <h1 className="mb-8 text-3xl font-bold text-orange-600 md:text-4xl">
        Atendimentos, <span className="text-[#064790]">Clientes</span>
      </h1>
      <Image
        src={heroImg}
        width={600}
        className="max-w-sm md:max-w-xl"
        alt="Imagem hero do Helpdesk - Manager"
      />
    </main>
  )
}
