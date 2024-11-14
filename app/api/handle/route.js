import { NextResponse } from "next/server"

import { prisma } from "@/lib/db"

export async function POST(req) {
  const { token, handle, did, domain } = await req.json()
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    }
  )

  const data = await response.json()
  let success = data.success && data.score > 0.5

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
