import Image from 'next/image'
import AddCollection from '@/components/add-collection'
import { getCollections } from '@/actions/collection-actions'
import RemoveCollection from '@/components/remove-collection'

const Collections = async () => {
  const collections = (await getCollections()) || []

  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        <AddCollection />
        {collections?.map((collection) => (
          <div
            key={collection.id}
            className="group relative flex flex-col items-center justify-between p-4 border-black border-2 rounded-md bg-slate-300"
          >
            <RemoveCollection collectionId={collection.id} />
            <div className="w-full mt-8">
              <Image
                width={100}
                height={100}
                className="w-full object-cover group-hover:scale-102 duration-300 ease-in-out rounded-md cursor-pointer"
                src={`${collection.images.length === 0 ? '/preview_collection.png' : collection.images[0].path}`}
                alt=""
              />
            </div>
            <div className="text-sm font-semibold text-black py-2 group-hover:scale-110 duration-300 ease-in-out">
              {collection.name}
            </div>
            <div className="text-sm font-semibold text-black py-2 group-hover:scale-110 duration-300 ease-in-out">
              Images in collection: {collection.images.length}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Collections
