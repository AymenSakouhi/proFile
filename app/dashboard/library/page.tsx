'use client'

import DisplayImages from '@/components/display-images'
import { getImagesAction } from '@/actions/dashboard-actions'
import { Input } from '@/components/ui/input'
import { Image as ImageType } from '@/lib/generated/prisma'
import { useEffect, useState } from 'react'

const Library = () => {
  const [images, setImages] = useState<ImageType[] | undefined>([])
  const [isLoading, setLoading] = useState(true)
  const [filteredImages, setFilteredImages] = useState<ImageType[] | undefined>(
    images,
  )

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await getImagesAction()
      setLoading(false)
      setImages(fetchedImages)
      setFilteredImages(fetchedImages)
    }
    fetchImages()
  }, [])

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

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        Is Loading....!
      </div>
    )

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

export default Library
