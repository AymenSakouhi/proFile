import { NextRequest } from 'next/server'
import { customAlphabet } from 'nanoid'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import prisma from '@/lib/prisma'
import { uploadToS3 } from '@/utils/utils'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const file = formData.get('file') as File
  const collectionId = formData.get('collectionId') as string

  if (!file) {
    return new Response('Error', {
      status: 400,
    })
  }

  if (!session?.user) {
    return new Response('Error', {
      status: 401,
    })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const nanoid = customAlphabet('1234567890abcdef', 10)
  const filename = `${nanoid()}${file.name}`
  const completeFileName = `${session?.user.id}/${filename}`

  const response = await uploadToS3(buffer, completeFileName)
  if (response.ok) {
    await prisma.image.create({
      data: {
        name: filename,
        path: completeFileName,
        userId: session?.user.id,
        //TODO to go back to
        ...(collectionId && { collectionId }),
      },
    })
  }

  return new Response('Success', {
    status: 200,
  })
}
