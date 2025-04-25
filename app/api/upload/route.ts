// AWS_ACCESS_KEY_ID=
// AWS_SECRET_ACCESS_KEY=
// AWS_DISTRIBUTION_URL=

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest } from 'next/server'

const s3 = new S3Client({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToS3(file: Buffer, filename: string) {
  await s3.send(
    new PutObjectCommand({
      Bucket: 'nextjs-app-profile-8fypnv2el3wb8',
      Key: filename,
      Body: file,
      ContentType: 'image/jpeg',
    }),
  )
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return new Response('Error', {
      status: 400,
    })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const filename = `${Date.now}${file.name}`

  const response = await uploadToS3(buffer, filename)
  console.log(response)

  return new Response('Success', {
    status: 200,
  })
}
