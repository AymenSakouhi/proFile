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
import { errorMessage } from './add-collection-dialog'
import { checkImagePassword } from '@/actions/image-actions'
import { useRouter } from 'next/navigation'
import { imageProtectedAtom } from '@/app/image/_atoms'
import { useAtom } from 'jotai'

type CheckPasswordDialogProps = {
  open: boolean
  onOpenChange: (foo: boolean) => void
  imgId: string
}

export default function CheckPasswordDialog({
  open,
  onOpenChange,
  imgId,
}: CheckPasswordDialogProps) {
  const router = useRouter()
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<errorMessage[]>([])
  const [isProtected, setIsProtected] = useAtom(imageProtectedAtom)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>What is the password for you image?</DialogTitle>
          <DialogDescription>
            You got this link to see an image, but it is protected via a
            password. Just type it in below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Example: MyPassword!!!!"
              className="col-span-3"
              name="password"
              onChange={(e) => {
                e.preventDefault()
                setPassword(e.target.value)
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
                  const result = await checkImagePassword(password, imgId)
                  if (result?.error) {
                    setErrors(result?.error?.password)
                  }
                  if (result?.image) {
                    onOpenChange(!open)
                    setIsProtected(!isProtected)
                    router.refresh()
                  }
                }}
              >
                Check Password
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
