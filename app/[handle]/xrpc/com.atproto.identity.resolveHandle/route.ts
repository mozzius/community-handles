import { NextResponse, type NextRequest } from "next/server"

export const GET = async (
  request: NextRequest,
  { params }: { params: { handle: string } }
) => {
  const { handle } = params

  return NextResponse.json({
    did: "did:plc:p2cp5gopk7mgjegy6wadk3ep",
  })
}
