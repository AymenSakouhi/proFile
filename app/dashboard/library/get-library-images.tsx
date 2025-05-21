import { getImagesAction } from '@/actions/dashboard-actions'
import LibraryClient from './library-client'

export async function GetLibraryImages() {
  const images = await getImagesAction()

  return <LibraryClient images={images} />
}
