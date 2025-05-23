'use client'

import { useEffect, useState } from 'react'
import { Copy } from 'lucide-react'
import Image from 'next/image'

import { Image as ImageType } from '@/lib/generated/prisma'
import { IMAGEHOSTNAME } from '@/utils/constants'

type DisplayImagsesProps = {
  images: ImageType[] | undefined
}

export default function DisplayImages({ images }: DisplayImagsesProps) {
  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/image/${id}`)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  if (!images) {
    return <p>No images to display</p>
  }

  return (
    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
      {images?.length > 0 &&
        images?.map((img) => {
          const srcUrl =
            `${IMAGEHOSTNAME}${img?.path}` || '/preview_collection.png'
          return (
            <div
              className="flex flex-col items-center justify-center h-fit"
              key={img?.path}
            >
              <div className="group w-full h-44 relative cursor-pointer border-4 border-black rounded-md overflow-hidden bg-black/80">
                <Image
                  src={srcUrl}
                  alt={img.id}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover duration-300 ease-in-out group-hover:scale-105 opacity-100 transition-opacity group-hover:opacity-10"
                />
                <div className="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-[50%] text-3xl text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <Copy
                    size={36}
                    onClick={() => {
                      handleCopy(img.id)
                    }}
                  />
                  {isCopied && <span className="text-sm">Copied!</span>}
                </div>
              </div>
              <span className="text-foreground font-bold">
                Created at: {img.createdAt.toLocaleDateString()}
              </span>
              <span className="text-center text-foreground font-bold w-full not-hover:truncate">
                Name: {img.id.split('.')[0]}
              </span>
            </div>
          )
        })}
    </div>
  )
}
