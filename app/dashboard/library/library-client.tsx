'use client'

import DisplayImages from '@/components/display-images'
import { Input } from '@/components/ui/input'
import { Image as ImageType } from '@/lib/generated/prisma'
import { useState } from 'react'

export default function LibraryClient({
  images: initialImages,
}: {
  images: ImageType[] | undefined
}) {
  const [images, setImages] = useState<ImageType[]>(initialImages || [])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredImages = images?.filter((img) => {
    return (
      img.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.collectionId?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const removeImageFromUI = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
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
      <DisplayImages images={filteredImages} onDelete={removeImageFromUI} />
    </div>
  )
}
