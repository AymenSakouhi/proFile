'use client'

import DisplayImages from '@/components/display-images'
import { Input } from '@/components/ui/input'
import { Image as ImageType } from '@/lib/generated/prisma'
import { useState } from 'react'

export default function LibraryClient({
  images,
}: {
  images: ImageType[] | undefined
}) {
  const [filteredImages, setFilteredImages] = useState<ImageType[] | undefined>(
    images,
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!images?.length) return
    const temp = images?.filter(
      (img) =>
        //TODO by id I mean name
        img.id.toLowerCase().includes(e.target.value) ||
        img.collectionId?.toLowerCase().includes(e.target.value),
    )
    setFilteredImages(temp)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl my-2">Your uploaded images</h1>
      <p className="text-center text-xl ">
        Please hover and copy any of the images, you are willing to share with
        someone
      </p>
      <Input
        placeholder="Search your image by name or collection"
        className="my-8 w-1/2 self-center border-slate-500 border-2"
        onChange={handleSearch}
      />
      <DisplayImages images={filteredImages} />
    </div>
  )
}
