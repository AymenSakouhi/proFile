'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { IMAGEHOSTNAME } from '@/utils/constants'
import CheckPassword from '@/components/check-password'
import { Image as ImageType } from '@/lib/generated/prisma'
import { useParams } from 'next/navigation'
import { imageProtectedAtom } from '@/app/image/_atoms'
import { useAtom } from 'jotai'

const ImageAccess = () => {
  const params = useParams()
  const id: string = params.id as string

  const [image, setImage] = useState<ImageType | null>(null)
  const [loading, setLoading] = useState(true)
  const [isProtected, setIsProtected] = useAtom(imageProtectedAtom)

  useEffect(() => {
    const getImage = async () => {
      if (!id) return
      try {
        const res = await fetch(`/api/image/${id}`)
        const data = await res.json()
        setImage(data.image)
        setIsProtected(data.image.protected)
      } catch (e) {
        console.error(e)
        setImage(null)
      } finally {
        setLoading(false)
      }
    }
    getImage()
    //eslint-disable-next-line
  }, [id])

  if (loading)
    return (
      <div className="bg-gray-800 h-screen flex items-center justify-center">
        Loading.....
      </div>
    )

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      {image ? (
        <>
          <div className="w-full">
            {
              <Image
                className={`${isProtected ? 'blur-3xl' : ''} z-0`}
                fill={true}
                objectFit="contain"
                src={
                  image?.path?.length && isProtected === false
                    ? `${IMAGEHOSTNAME}${image?.path}`
                    : '/preview_collection_2.png'
                }
                alt="your public image"
              />
            }
            {isProtected && <CheckPassword imgId={id} />}
          </div>
        </>
      ) : (
        <p className="text-white">Wrong ID, or image not accessible</p>
      )}
    </div>
  )
}

export default ImageAccess
