import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import DisplayImages from '@/components/display-images'

const CollectionContent = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const collection = await prisma.collection.findFirst({
    where: {
      id,
      userId: session?.user.id, // checking if he has access
    },
    include: {
      images: true,
    },
  })

  if (!collection)
    return <p>No collection found or you don`t have access to it</p>
  if (!collection.images.length) return <p>No images found</p>

  return (
    <div>
      <p className="text-xl">collection: {collection.name}</p>
      <DisplayImages images={collection.images} />
    </div>
  )
}

export default CollectionContent
