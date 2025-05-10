'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { deleteCollectionAction } from '@/actions/collection-actions'

import { useRouter } from 'next/navigation'

type DialogProps = {
  collectionId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function RemoveCollectionDialog({
  collectionId,
  open,
  onOpenChange,
}: DialogProps) {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure to delete the collection</DialogTitle>
          <DialogDescription>
            Please click okay in order to confirm deletion
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <DialogFooter>
              <Button
                type="submit"
                onClick={async () => {
                  const result = await deleteCollectionAction(collectionId)
                  if (result) {
                    onOpenChange(!open)
                    router.refresh()
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
