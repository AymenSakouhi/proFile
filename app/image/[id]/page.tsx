'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { IMAGEHOSTNAME } from '@/utils/constants'
import CheckPassword from '@/components/check-password'
import { Image as ImageType } from '@/lib/generated/prisma'
import { useParams } from 'next/navigation'

const ImageAccess = () => {
  const params = useParams()
  const id: string = params.id as string

  const [image, setImage] = useState<ImageType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getImage = async () => {
      if (!id) return
      try {
        const res = await fetch(`/api/image/${id}`)
        const data = await res.json()
        setImage(data.image)
        setLoading(false)
      } catch (e) {
        console.error(e)
        setImage(null)
      } finally {
        setLoading(false)
      }
    }
    getImage()
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
                className={`${image?.protected ? 'blur-3xl' : ''} z-0`}
                fill={true}
                objectFit="contain"
                src={
                  image?.path?.length && !image.protectionPassword
                    ? `${IMAGEHOSTNAME}${image?.path}`
                    : '/preview_collection_2.png'
                }
                alt="your public image"
              />
            }
            {image?.protected && <CheckPassword imgId={id} />}
          </div>
        </>
      ) : (
        <p className="text-white">Wrong ID, or image not accessible</p>
      )}
    </div>
  )
}

export default ImageAccess
