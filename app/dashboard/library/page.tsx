import { Suspense } from 'react'
import { GetLibraryImages } from './get-library-images'

export const experimental_ppr = true

export default function Library() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col items-center justify-center">
          Is Loading....!
        </div>
      }
    >
      {
        //this component is fetching data and its async
      }
      <GetLibraryImages />
    </Suspense>
  )
}
