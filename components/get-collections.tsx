import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import { getCollections } from '@/actions/collection-actions'
import RemoveCollection from '@/components/remove-collection'
import { IMAGEHOSTNAME } from '@/utils/constants'
import Link from 'next/link'

export default async function CollectionCard() {
  const collections = (await getCollections()) || []
  // flex flex-col items-center justify-between p-4 border-black border-2 rounded-md bg-slate-300
  // className="absolute right-0 top-0 m-2 cursor-pointer"
  // group-hover:scale-102 duration-300 ease-in-out rounded-md cursor-pointer
  return (
    <>
      {collections?.map((collection) => {
        const url = collection.images[0]
          ? IMAGEHOSTNAME + collection?.images[0]?.path
          : '/preview_collection_2.png'
        return (
          <Card
            key={collection.id}
            className="group py-0 gap-0 w-full max-w-sm hover:shadow-lg transition-shadow duration-300 relative cursor-pointer"
          >
            <CardHeader className="gap-0">
              <div className="absolute hidden group-hover:block top-2 right-2 z-10">
                <RemoveCollection collectionId={collection.id} />
              </div>
            </CardHeader>
            <Link href={`/dashboard/collections/${collection.id}`}>
              <div className="overflow-hidden rounded-t-md">
                <Image
                  width={640}
                  height={426}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={url}
                  alt={collection.name}
                />
              </div>
              <CardContent className="p-4 space-y-4">
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {collection.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Images in collection: {collection.images.length}
                </p>
              </CardContent>
            </Link>
          </Card>
        )
      })}
    </>
  )
}
