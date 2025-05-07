'use client'
import { FilePlus2 } from 'lucide-react'
import { useState } from 'react'
import Dialog from '@/components/dialog'

const AddCollection = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="group flex flex-col items-center justify-center p-4 border-black border-2 rounded-md bg-slate-300 cursor-pointer"
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
        <div className="text-sm font-semibold text-black py-2 group-hover:scale-110 duration-300 ease-in-out">
          Add Collection
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen} />
    </>
  )
}

export default AddCollection
