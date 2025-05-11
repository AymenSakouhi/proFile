import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { UploadSection } from '@/components/upload-file-section'
import { getCollections } from '@/actions/collection-actions'

export default async function FileUpload() {
  const collections = await getCollections()

  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-center text-2xl">
            Please specify your image upload criteria
          </h1>
          <UploadSection collections={collections} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  )
}
