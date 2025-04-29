'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Image from 'next/image'

import { useDropzone } from 'react-dropzone'

function Previews() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const thumbs = files.map((file) => (
    <div
      className="inline-flex border-2 border-amber-200 mb-2 mr-2"
      key={file.name}
    >
      <div>
        <Image
          width={80}
          height={80}
          alt={file.name}
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <>
      <section className="container p-6 space-y-4">
        <div
          {...getRootProps({ className: 'dropzone' })}
          className="rounded-lg flex flex-col gap-1 p-6 items-center border-4 border-gray-500 border-dashed"
        >
          <FileIcon className="w-12 h-12" />
          <input {...getInputProps()} max={1} />
          {isDragActive ? (
            <div className="text-sm font-medium">Drop your file here!</div>
          ) : (
            <p className="text-sm font-medium">
              Drag and drop some files here, or click to select files
            </p>
          )}
        </div>
        <aside>{thumbs}</aside>
      </section>
    </>
  )
}

;<Previews />

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

const FileUpload = () => {
  const [file, setFile] = React.useState<File | undefined>()
  const handleUploadFile = async (file: File) => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      toast.success('File uploaded successfully')
    } catch (e) {
      toast.error('Failed to upload the file')
      console.error(e)
    }
  }

  return (
    <>
      <Card className="m-6">
        <CardContent className="p-6 space-y-4">
          <Previews />
          {/* <Dropzone
              maxFiles={1}
              onDrop={(acceptedFiles: File[]) => {
                // Do something with the files
                handleUploadFile(acceptedFiles[0])
              }}
            >
              {(dropzone: DropzoneState) => (
              )}
            </Dropzone> */}

          <div className="space-y-2 text-sm">
            <Label htmlFor="file" className="text-sm font-medium">
              File
            </Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                setFile(file)
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={!!file}
            size="lg"
            onClick={async () => {
              await handleUploadFile(file!)
            }}
          >
            Upload
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default FileUpload
