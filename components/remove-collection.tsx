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
      <CircleX
        className="absolute right-0 top-0 m-2 cursor-pointer"
        onClick={() => {
          setOpen(!open)
        }}
      />
      <RemoveCollectionDialog
        open={open}
        onOpenChange={setOpen}
        collectionId={collectionId}
      />
    </>
  )
}
