import { AppBskyActorDefs } from "@atproto/api"
import { Check, X } from "lucide-react"

import { agent } from "@/lib/atproto"
import { prisma } from "@/lib/db"
// import { hasExplicitSlur } from "@/lib/slurs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Profile } from "@/components/profile"
import { Stage } from "@/components/stage"

export function generateMetadata({ params }: { params: { domain: string } }) {
  const domain = params.domain
  return {
    title: `${domain} - obtenha seu usuário de comunidade para Bluesky`,
    description: `obtenha seu próprio usuário ${domain}`,
  }
}

export default async function IndexPage({
  params,
  searchParams,
}: {
  params: {
    domain: string
  }
  searchParams: {
    handle?: string
    "new-handle"?: string
  }
}) {
  const domain = params.domain
  let handle = searchParams.handle
  let newHandle = searchParams["new-handle"]
  let profile: AppBskyActorDefs.ProfileView | undefined
  let error1: string | undefined
  let error2: string | undefined

  if (handle) {
    try {
      if (!handle.includes(".")) {
        handle += ".bsky.social"
      }
      console.log("fetching profile", handle)
      const actor = await agent.getProfile({
        actor: handle,
      })
      if (!actor.success) throw new Error("fetch was not a success")
      profile = actor.data
    } catch (e) {
      console.error(e)
      error1 = (e as Error)?.message ?? "unknown error"
    }

    if (newHandle && profile) {
      newHandle = newHandle.trim().toLowerCase()
      if (!newHandle.includes(".")) {
        newHandle += "." + domain
      }
      if (!error1) {
        // regex: (alphanumeric, -, _).(domain)
        const validHandle = newHandle.match(
          new RegExp(`^[a-zA-Z0-9-_]+.${domain}$`)
        )
        if (validHandle) {
          try {
            const handle = newHandle.replace(`.${domain}`, "")
            // some users without intentional insults were blocked from creating a user
            // if (hasExplicitSlur(handle)) {
            //   throw new Error("slur")
            // }

            if (domain === "army.social" && RESERVED.includes(handle)) {
              throw new Error("reserved")
            }

            const existing = await prisma.user.findFirst({
              where: { handle },
              include: { domain: true },
            })
            if (existing && existing.domain.name === domain) {
              if (existing.did !== profile.did) {
                error2 = "handle taken"
              }
            } else {
              await prisma.user.create({
                data: {
                  handle,
                  did: profile.did,
                  domain: {
                    connectOrCreate: {
                      where: { name: domain },
                      create: { name: domain },
                    },
                  },
                },
              })
            }
          } catch (e) {
            console.error(e)
            error2 = (e as Error)?.message ?? "unknown error"
          }
        } else {
          error2 = "invalid handle"
        }
      }
    }
  }

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Obtenha seu próprio usuário {domain}{" "}
          <br className="hidden sm:inline" />
          para Bluesky
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Siga as instruções abaixo para obter seu próprio usuário {domain}
        </p>
      </div>
      <div>
        <Stage title="Insira seu usuário atual" number={1}>
          <form>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex w-full max-w-sm items-center space-x-2">
                {newHandle && (
                  <input type="hidden" name="new-handle" value="" />
                )}
                <Input
                  type="text"
                  name="handle"
                  placeholder="user.bsky.social"
                  defaultValue={handle}
                  required
                />
                <Button type="submit">Enviar</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Insira seu usuário atual, sem incluir o @
              </p>
              {error1 && (
                <p className="flex flex-row items-center gap-2 text-sm text-red-500">
                  <X className="size-4" /> usuário não encontrado - por favor,
                  tente novamente
                </p>
              )}
              {profile && (
                <>
                  <p className="text-muted-forground mt-4 flex flex-row items-center gap-2 text-sm">
                    <Check className="size-4 text-green-500" /> Conta encontrada
                  </p>
                  <Profile profile={profile} className="mt-4" />
                </>
              )}
            </div>
          </form>
        </Stage>
        <Stage title="Escolha seu novo usuário" number={2} disabled={!profile}>
          <form>
            <input type="hidden" name="handle" value={handle} />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  name="new-handle"
                  placeholder={`user.${domain}`}
                  defaultValue={newHandle}
                />
                <Button type="submit">Enviar</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Insira o usuário {domain} que você gostaria de ter, sem incluir
                o @
              </p>
              {error2 && (
                <p className="text-sm text-red-500">
                  {(() => {
                    switch (error2) {
                      case "handle taken":
                        return "usuário já em uso - por favor, insira um usuário diferente"
                      case "invalid handle":
                      case "slur":
                        return "usuário inválido - por favor, insira um usuário diferente"
                      case "reserved":
                        return "usuário reservado - por favor, insira um usuário diferente"
                      default:
                        return "Ocorreu um erro - por favor, tente novamente"
                    }
                  })()}
                </p>
              )}
            </div>
          </form>
        </Stage>
        <Stage
          title="Altere seu usuário no aplicativo Bluesky"
          number={3}
          disabled={!newHandle || !!error2}
          last
        >
          <p className="max-w-lg text-sm">
            Vá em Configurações {">"} Avançado {">"} Alterar Usuário. Selecione
            &quot;Eu tenho meu próprio domínio&quot; e insira{" "}
            {newHandle ? `"${newHandle}"` : "seu novo usuário"}. Por fim, toque
            &quot;Verificar registro DNS&quot;.
          </p>
          <p className="mt-6 max-w-lg text-sm">
            Se você gostou deste projeto, considere me {" "}
            <a href="https://livepix.gg/5eiat" className="underline">
              apoiar
            </a>
            .
          </p>
          <p className="mt-1 max-w-lg text-xs">
            Tradução e host por{" "}
            <a href="https://bsky.app/profile/nayeon.twice.social" className="underline">
              @nayeon.twice.social
            </a>
            .
          </p>
          <p className="mt-1 max-w-lg text-xs">
            Template por{" "}
            <a href="https://github.com/sponsors/mozzius" className="underline">
              @mozzius
            </a>
            .
          </p>
        </Stage>
      </div>
    </main>
  )
}

const RESERVED = ["tales", "taleslol"].map((x) => x.toLowerCase())
