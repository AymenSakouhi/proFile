import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
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
