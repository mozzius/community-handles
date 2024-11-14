import { NextResponse } from "next/server"

import { prisma } from "@/lib/db"
import { verifyReCaptcha } from "@/lib/service"

export async function POST(req: Request) {
  const { token, handle, did, domain } = await req.json()
  let success = await verifyReCaptcha(token)

  //   successful recaptcha
  let error = ""
  if (success) {
    const existing = await prisma.user.findFirst({
      where: { handle },
      include: { domain: true },
    })

    if (existing && existing.domain.name === domain) {
      if (existing.did !== did) {
        error = "handle taken"
      }
    } else {
      await prisma.user.create({
        data: {
          handle,
          did,
          domain: {
            connectOrCreate: {
              where: { name: domain },
              create: { name: domain },
            },
          },
        },
      })
    }
  }

  return NextResponse.json({ success, error })
}
