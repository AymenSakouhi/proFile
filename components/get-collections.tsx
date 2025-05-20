import Image from 'next/image'
import { getCollections } from '@/actions/collection-actions'
import RemoveCollection from '@/components/remove-collection'
import { IMAGEHOSTNAME } from '@/utils/constants'
import Link from 'next/link'

const GetCollections = async () => {
  const collections = (await getCollections()) || []

  return (
    <>
      {collections?.map((collection) => {
        const url = collection.images[0]
          ? IMAGEHOSTNAME + collection?.images[0]?.path
          : '/preview_collection.png'
        return (
          <div
            key={collection.id}
            className="group relative flex flex-col items-center justify-between p-4 border-black border-2 rounded-md bg-slate-300"
          >
            <RemoveCollection collectionId={collection.id} />
            <Link href={`/dashboard/collections/${collection.id}`}>
              <div className="w-full mt-8">
                <Image
                  width={100}
                  height={100}
                  className="w-full object-cover group-hover:scale-102 duration-300 ease-in-out rounded-md cursor-pointer"
                  src={url}
                  alt={collection.name}
                />
              </div>
              <div className="text-sm font-semibold text-black py-2 group-hover:scale-110 duration-300 ease-in-out">
                {collection.name}
              </div>
              <div className="text-sm font-semibold text-black py-2 group-hover:scale-110 duration-300 ease-in-out">
                Images in collection: {collection.images.length}
              </div>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default GetCollections
