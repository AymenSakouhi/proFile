'use client'

import { getImagesAction } from '@/app/actions/dashboard-actions'
import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

const Library = () => {
  const [images, setImages] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await getImagesAction()
      setLoading(false)
      setImages(fetchedImages)
    }
    fetchImages()
  }, [])

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center"></div>
    )

  return (
    <div>
      <h1 className="text-center text-3xl mt-2">Your uploaded images</h1>
      <p className="text-center text-xl my-8">
        Please hover and copy any of the images, you are willing to share with
        someone
      </p>
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.length > 0 &&
          images.map((img) => (
            <div
              className="flex flex-col items-center justify-center"
              key={img.path}
            >
              <div className="group w-full h-44 relative cursor-pointer border-4 border-black rounded-md overflow-hidden bg-black/80">
                <img
                  src={`https://${process.env.NEXT_PUBLIC_AWS_DISTRIBUTION_URL}/${img.path}`}
                  alt="Zoom on hover"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 opacity-100 transition-opacity duration-300 group-hover:opacity-10"
                />
                <p className="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-[50%] text-3xl text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <Copy
                    size={36}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://${process.env.AWS_DISTRIBUTION_URL}/${img.path}`,
                      )
                    }}
                  />
                </p>
              </div>
              <span className="text-slate-700 font-bold">
                Created at: {img.createdAt.toLocaleDateString()}
              </span>
              <span className="text-slate-700 font-bold text-ellipsis">
                Name: {img.id.split('.')[0]}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Library
