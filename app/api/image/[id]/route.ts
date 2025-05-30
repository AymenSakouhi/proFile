import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string
    }
  },
) {
  const { id } = await params
  const image = await prisma.image.findFirst({
    where: {
      id,
    },
  })

  if (!image) {
    return NextResponse.json({ image: null, status: 404 })
  }
  return NextResponse.json({
    image,
  })
}
