import AddCollection from '@/components/add-collection'
import GetCollections from '@/components/get-collections'
import { Suspense } from 'react'

export const experimental_ppr = true

const Collections = async () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        <AddCollection />
        <Suspense fallback={<p>Loading...</p>}>
          <GetCollections />
        </Suspense>
      </div>
    </>
  )
}

export default Collections
