'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import CheckPasswordDialog from './check-password-dialog'

export default function CheckPassword({ imgId }: { imgId: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button
        onClick={() => {
          setOpen((prev) => !prev)
        }}
        className="scale-200 absolute top-1/2 left-1/2 -translate-x-1/2 z-20 bg-background text-foreground hover:bg-foreground hover:text-background"
      >
        Password?
      </Button>
      <CheckPasswordDialog open={open} onOpenChange={setOpen} imgId={imgId} />
    </div>
  )
}
