'use client'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import RemoveCollectionDialog from '@/components/remove-collection-dialog'

type Props = {
  collectionId: string
}

export default function RemoveCollection({ collectionId }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-gray-500 rounded-full">
        <CircleX
          onClick={() => {
            setOpen(!open)
          }}
          color="white"
        />
      </div>
      <RemoveCollectionDialog
        open={open}
        onOpenChange={setOpen}
        collectionId={collectionId}
      />
    </>
  )
}
