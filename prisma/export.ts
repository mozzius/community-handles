import fs from "node:fs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  if (!fs.existsSync("./export")) {
    fs.mkdirSync("./export")
  }
  for (const domain of await prisma.domain.findMany()) {
    console.log(domain.name)
    let csv: string[][] = [["handle", "did", "createdAt"]]
    const users = await prisma.user.findMany({
      where: { domainId: domain.id },
    })
    for (const user of users) {
      csv.push([user.handle, user.did, user.createdAt.toISOString()])
    }
    fs.writeFileSync(
      `./export/${domain.name.replace(".", "_")}.csv`,
      csv.map((row) => row.join(",")).join("\n")
    )
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
