'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

import { addCollectionAction } from '@/actions/collection-actions'

import { useRouter } from 'next/navigation'

type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type errorMessage = { message: string }

export default function AddCollectionDialog({
  open,
  onOpenChange,
}: DialogProps) {
  const router = useRouter()

  const [collectionName, setCollectionName] = useState<string>('')
  const [errors, setErrors] = useState<errorMessage[] | undefined>()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add your collection</DialogTitle>
          <DialogDescription>
            By adding your collection, you will be able to attach couple of
            images to it later on
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Example: Gaming"
              className="col-span-3"
              onChange={(e) => {
                e.preventDefault()
                setCollectionName(e.target.value)
              }}
            />
            {errors?.map((error: errorMessage) => (
              <p key={error.message} className="text-foreground text-sm">
                {error.message}
              </p>
            ))}
            <DialogFooter>
              <Button
                type="submit"
                className="text-foreground"
                onClick={async () => {
                  const result = await addCollectionAction(
                    collectionName.trim(),
                  )

                  if (result?.error) {
                    setErrors(result?.error?.name)
                  }

                  if (result?.collection) {
                    onOpenChange(!open)
                    router.refresh()
                  }
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
