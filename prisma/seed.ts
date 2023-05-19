import { PrismaClient } from "@prisma/client"
import { kv } from "@vercel/kv"

const prisma = new PrismaClient()

async function main() {
  const keys = await kv.keys("*")

  for (const key of keys) {
    const did = (await kv.get(key)) as string

    const [handle, ...rest] = key.split(".")
    const domain = rest.join(".")

    await prisma.user.create({
      data: {
        did,
        handle,
        domain: {
          connectOrCreate: {
            where: {
              name: domain,
            },
            create: {
              name: domain,
            },
          },
        },
      },
    })

    console.log("Added", key, did)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
