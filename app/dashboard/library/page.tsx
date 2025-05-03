'use client'

import { getImagesAction } from '@/app/actions/dashboard-actions'
import { Input } from '@/components/ui/input'
import { Image as ImageType } from '@/lib/generated/prisma'
import { Copy } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ImageHostname = `https://${process.env.NEXT_PUBLIC_AWS_DISTRIBUTION_URL}`

const Library = () => {
  const [images, setImages] = useState<ImageType[] | undefined>([])
  const [isLoading, setLoading] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
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

  const handleCopy = (img: ImageType) => {
    navigator.clipboard.writeText(`${ImageHostname}/${img.path}`)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!images?.length) return
    const temp = images?.filter((img) =>
      img.id.toLowerCase().includes(e.target.value),
    )
    setFilteredImages(temp)
  }

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center"></div>
    )

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl my-2">Your uploaded images</h1>
      <p className="text-center text-xl ">
        Please hover and copy any of the images, you are willing to share with
        someone
      </p>
      <Input
        placeholder="Search your image"
        className="my-8 w-1/2 self-center border-slate-500 border-2"
        onChange={handleSearch}
      />
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredImages!.length > 0 &&
          filteredImages?.map((img) => (
            <div
              className="flex flex-col items-center justify-center h-fit"
              key={img.path}
            >
              <div className="group w-full h-44 relative cursor-pointer border-4 border-black rounded-md overflow-hidden bg-black/80">
                <Image
                  src={`${ImageHostname}/${img?.path}`}
                  alt={img?.id}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover duration-300 ease-in-out group-hover:scale-105 opacity-100 transition-opacity group-hover:opacity-10"
                />
                <div className="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-[50%] text-3xl text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <Copy
                    size={36}
                    onClick={() => {
                      handleCopy(img)
                    }}
                  />
                  {isCopied && <span className="text-sm">Copied!</span>}
                </div>
              </div>
              <span className="text-slate-700 font-bold">
                Created at: {img.createdAt.toLocaleDateString()}
              </span>
              <span className="text-center text-slate-700 font-bold w-full not-hover:truncate">
                Name: {img.id.split('.')[0]}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Library
