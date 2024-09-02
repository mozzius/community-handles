import { Stage } from "@/components/stage"

export const metadata = {
  title: "Crie um Indentificador da Comunidade para a sua comunidade",
  description: "Hospede seu próprio serviço.",
}

export default function CommunityPage() {
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Crie um Identificador da Comunidade{" "}
          <br className="hidden sm:inline" />
          para a sua comunidade
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Quer um identificador personalizado para sua comunidade, como
          @alex.bsky.london, @jay.twice.social ou @jane.bsky.paris? Siga estes
          passos para obter o seu.
        </p>
      </div>
      <div>
        <Stage title="Compre um domínio" number={1}>
          <p className="max-w-lg">
            Compre um domínio de um registrador de domínios. Nós usamos{" "}
            <a
              href="https://namecheap.com"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Namecheap
            </a>
            , mas não importa qual você use. Apenas certifique-se de que você
            possa alterar o apontamento dos nameservers.
          </p>
        </Stage>
        <Stage title="Hospede o serviço Community Handles" number={2} last>
          <p className="max-w-lg">
            Em seguida, você precisa hospedar o serviço.
          </p>
          <p className="mt-4 max-w-lg">
            Se você quiser hospedar por conta própria,{" "}
            <a
              href="https://github.com/mozzius/community-handles"
              className="underline"
            >
              faça um fork do projeto no GitHub
            </a>
            . É um projeto Next.js, então você pode fazer o deploy da maneira
            que preferir. Confira o README para a solução recomendada, usando
            Vercel e Railway.
          </p>
          <p className="mt-8 max-w-lg text-sm text-muted-foreground">
            Usando a versão hospedada? (não está mais disponível){" "}
            <a
              href="https://billing.stripe.com/p/login/6oEbJccQOh2Rdji4gg"
              className="underline"
            >
              Vá para o portal de cobrança
            </a>
            .
          </p>
        </Stage>
      </div>
    </main>
  )
}
