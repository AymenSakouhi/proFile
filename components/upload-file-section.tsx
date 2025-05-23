'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

import { useDropzone } from 'react-dropzone'
import { FileIcon } from 'lucide-react'
import { SelectBox } from '@/components/select-box'
import type { CollectionsWithImagesType } from '@/app/dashboard/fileupload/page'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

type UploadSectionProps = {
  collections: CollectionsWithImagesType[] | undefined
}

export function UploadSection({ collections }: UploadSectionProps) {
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  )

  const handleUploadFile = async (files: File[]) => {
    if (!files.length) return
    files.forEach(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      if (selectedCollection)
        formData.append('collectionId', selectedCollection)
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          /* body: JSON.stringify({
            formData,
            collectionName: selectedCollection,
          }), */
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
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 10,
    maxSize: 2000000,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
      handleUploadFile(acceptedFiles)
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
      <section className="container p-4 space-y-6 flex flex-col items-center m-auto w-full">
        <p>Select the collection where you are uploading your files:</p>
        <SelectBox
          name="collections"
          items={collections}
          handleValueChange={(value) => {
            setSelectedCollection(value)
          }}
          className="w-full lg:w-1/3"
        />
        <Card className="w-full lg:w-10/12">
          <CardContent>
            <div
              {...getRootProps({ className: 'dropzone' })}
              className="rounded-lg flex flex-col gap-1 p-6 items-center justify-center border-2 border-foreground border-dashed xs:w-full h-64"
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
          </CardContent>
        </Card>
        <aside>{thumbs}</aside>
      </section>
    </>
  )
}
