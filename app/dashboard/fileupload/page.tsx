import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { UploadSection } from '@/components/upload-file-section'
import { getCollections } from '@/actions/collection-actions'
import { Prisma } from '@/lib/generated/prisma'

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const CollectionsWithImages = Prisma.validator<Prisma.CollectionDefaultArgs>()({
  include: { images: true },
})

export type CollectionsWithImagesType = Prisma.CollectionGetPayload<
  typeof CollectionsWithImages
>

export default async function FileUpload() {
  const collections: CollectionsWithImagesType[] | undefined =
    await getCollections()

  if (!collections) {
    return <p>Nothing</p>
  }

  return (
    <>
      <h1 className="text-center text-2xl mb-4">
        Please specify your image upload criteria
      </h1>
      <UploadSection collections={collections} />
    </>
  )
}
