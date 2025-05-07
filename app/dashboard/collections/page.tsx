import Image from 'next/image'
import AddCollection from '@/components/add-collection'

const Collections = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        <AddCollection />
        <div className="group flex flex-col items-center justify-between p-4 border-black border-2 rounded-md bg-slate-300">
          <div className="w-full">
            <Image
              width={100}
              height={100}
              className="w-full object-cover group-hover:scale-102 duration-300 ease-in-out rounded-md cursor-pointer"
              src="/tomandjerry.png"
              alt=""
            />
          </div>
          <div className="text-sm font-semibold text-black py-2 group-hover:scale-110 duration-300 ease-in-out">
            Collection Title
          </div>
        </div>
        <div className="group flex flex-col items-center justify-between p-4 border-black border-2 rounded-md bg-slate-300">
          <div className="w-full">
            <Image
              width={100}
              height={100}
              className="w-full object-cover group-hover:scale-102 duration-300 ease-in-out rounded-md cursor-pointer"
              src="/jean.png"
              alt=""
            />
          </div>
          <div className="text-sm font-semibold text-black py-2 group-hover:scale-110 duration-300 ease-in-out">
            Collection Title
          </div>
        </div>
      </div>
    </>
  )
}

export default Collections
