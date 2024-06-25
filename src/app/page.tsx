import Image from 'next/image'
import heroImg from '@/assets/hero.svg'

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] space-y-12 bg-slate-100 px-4 pb-24">
      <header className="mx-auto grid max-w-4xl items-center gap-10 py-12 md:grid-cols-2 md:pt-24">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold">
            Software de suporte técnico poderoso, estreitando a relação entre{' '}
            <span className="text-primary">Empresa</span> e{' '}
            <span className="text-secondary">Cliente</span>.
          </h1>
          <h2 className="mt-2 leading-relaxed">
            Nosso software de suporte técnico rico em recursos acelera a
            resolução de tickets com ferramentas avançadas.
          </h2>
        </div>
        <Image
          src={heroImg}
          width={600}
          className="mx-auto w-[98%] max-w-sm"
          alt="Imagem hero do Helpdesk - Manager"
        />
      </header>

      <main className="mx-auto flex max-w-4xl flex-col">
        <h3 className="mb-6 text-2xl font-bold">Principais recursos</h3>
        <section className="grid gap-5 sm:grid-cols-3 md:gap-12">
          <article>
            <label className="text-xl font-bold text-secondary">
              Acessibilidade
            </label>
            <p>
              Torne seu suporte técnico acessível em vários canais e
              dispositivos.
            </p>
          </article>
          <article>
            <label className="text-xl font-bold text-secondary">
              Produtividade
            </label>
            <p>Alinhe seu help desk com os objetivos da sua organização.</p>
          </article>
          <article>
            <label className="text-xl font-bold text-secondary">
              Segurança
            </label>
            <p>Garanta a proteção dos dados e a privacidade das informações.</p>
          </article>
        </section>
      </main>

      <footer className="mx-auto flex max-w-lg flex-col">
        <h4 className="mb-6 text-center text-lg font-bold md:text-xl">
          Saiba mais sobre nosso software de suporte técnico completo agora com
          nossos especialistas.
        </h4>
        <button className="mx-auto max-w-xs rounded bg-primary p-2 font-medium uppercase text-white">
          Solicite uma demonstração
        </button>
      </footer>
    </main>
  )
}
