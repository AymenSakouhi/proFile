'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Image from 'next/image'

import Dropzone, { DropzoneState } from 'shadcn-dropzone'

import { FileWithPath, useDropzone } from 'react-dropzone'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

function Previews() {
  const [files, setFiles] = useState<<FileWithPath && preview: string>[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      console.log(acceptedFiles)
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
      className="inline-flex broder-2 border-amber-200 mb-2 mr-2"
      key={file.name}
    >
      <div style={thumbInner}>
        <Image
          width={100}
          height={100}
          alt="whatever"
          src={file.preview}
          style={img}
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
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} max={1} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
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
                <div className="p-6 space-y-4">
                  <div className="rounded-lg flex flex-col gap-1 p-6 items-center">
                    <FileIcon className="w-12 h-12" />
                    {dropzone.isDragAccept ? (
                      <div className="text-sm font-medium">
                        Drop your file here!
                      </div>
                    ) : (
                      <div className="flex items-center flex-col gap-1.5">
                        <div className="flex items-center flex-row gap-0.5 text-sm font-medium">
                          Upload one file at a time
                        </div>
                      </div>
                    )}
                    <div className="text-xs text-gray-400 font-medium">
                      {dropzone.acceptedFiles.length} files uploaded so far.
                    </div>
                  </div>
                </div>
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
