'use client'

import { FilePlus2 } from 'lucide-react'
import { useState } from 'react'
import AddCollectionDialog from '@/components/add-collection-dialog'

export default function AddCollection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="group flex flex-col items-center justify-center p-4 border-black border-2 rounded-md bg-primary cursor-pointer"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <div className="w-full">
          <FilePlus2
            className="w-full group-hover:scale-110 duration-300 ease-in-out"
            size={36}
          />
        </div>
        <div className="text-sm font-semibold text-foreground py-2 group-hover:scale-110 duration-300 ease-in-out">
          Add Collection
        </div>
      </div>
      <AddCollectionDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
