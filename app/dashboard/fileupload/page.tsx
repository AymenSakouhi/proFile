'use client'

import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { File } from 'buffer'

function FileIcon(props: Record<string, unknown>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

const schema = z.object({
  file: z
    .custom<globalThis.File>((file) => file instanceof File, 'File Required')
    .refine((file) => file.size < 5 * 1024 * 1024, 'File must be less than 5MB')
    .refine(
      (file) => ['image/png', 'image/jpeg'].includes(file.type),
      'Only PNG or JPEG allowed',
    ),
})

const FileUpload = () => {
  const { handleSubmit, Field } = useForm({
    defaultValues: {
      file: undefined as globalThis.File | undefined,
    },
    onSubmit: async ({ value }) => {
      if (!value?.file) return

      const formData = new FormData()
      formData.append('file', value?.file)

      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
    },
  })

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit()
        }}
      >
        <Card className="m-6">
          <CardContent className="p-6 space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
              <FileIcon className="w-12 h-12" />
              <span className="text-sm font-medium text-gray-500">
                Drag and drop a file or click to browse
              </span>
              <span className="text-xs text-gray-500">
                PDF, image, video, or audio
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <Field
                name="file"
                validators={{
                  onChangeAsync: async ({ value }) => {
                    const result = schema.safeParse({ file: value })
                    if (!result.success) {
                      return result.error.format().file?._errors[0]
                    }
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <div className="grid gap-3">
                    <Label htmlFor={'file'} className="text-sm font-medium">
                      File
                    </Label>
                    <Input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      id={field.name}
                      name={field.name}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        console.log(file)
                        field.handleChange(file)
                      }}
                    />
                    {field.state.meta.errors ? (
                      <em className="text-red-500" role="alert">
                        {field.state.meta.errors
                          .map((error) => error?.message)
                          .join('')}
                      </em>
                    ) : null}
                  </div>
                )}
              </Field>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                console.log('clicked')
              }}
              size="lg"
            >
              Upload
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}

export default FileUpload
