import prisma from '@/lib/prisma'
import Image from 'next/image'
import { IMAGEHOSTNAME } from '@/utils/constants'

const ImageAccess = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const image = await prisma.image.findFirst({
    where: {
      id,
    },
  })

  const ImagePath = image?.path.length ? `${IMAGEHOSTNAME}${image?.path}` : ''

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      {ImagePath ? (
        <div className="">
          <Image
            className="w-full"
            fill={true}
            objectFit="contain"
            src={ImagePath}
            alt="your public image"
          />
        </div>
      ) : (
        <p className="text-white">Wrong ID, or image not accessible</p>
      )}
    </div>
  )
}

export default ImageAccess
