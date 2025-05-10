import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest } from 'next/server'
import { customAlphabet } from 'nanoid'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import prisma from '@/lib/prisma'

const s3 = new S3Client({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToS3(file: Buffer, filename: string) {
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: 'nextjs-app-profile-8fypnv2el3wb8',
        Key: filename,
        Body: file,
        ContentType: 'image/jpeg',
      }),
    )

    return { ok: true }
  } catch (e) {
    console.error('Your S3 send error ', e)
    return { ok: false }
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const { user } = await auth.api.getSession({
    headers: await headers(),
  })

  const file = formData.get('file') as File

  if (!file) {
    return new Response('Error', {
      status: 400,
    })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const nanoid = customAlphabet('1234567890abcdef', 10)
  const filename = `${nanoid()}${file.name}`
  const completeFileName = `${user.id}/${filename}`

  const response = await uploadToS3(buffer, completeFileName)
  if (response.ok) {
    await prisma.image.create({
      data: {
        name: filename,
        path: completeFileName,
        userId: user.id,
      },
    })
  }

  return new Response('Success', {
    status: 200,
  })
}
