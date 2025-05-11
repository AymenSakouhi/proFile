'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

import { useDropzone } from 'react-dropzone'
import { FileIcon } from 'lucide-react'
import { SelectBox } from '@/components/select-box'
import { SelectItem, SelectLabel } from '@/components/ui/select'
import type { Collection } from '@/lib/generated/prisma'

type UploadSectionProps = {
  collections: Collection[]
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
      <section className="container p-6 space-y-4">
        <p>Select the collection where you are uploading your files:</p>
        <SelectBox
          name="collections"
          items={collections}
          handleValueChange={(value) => {
            // console.log(value, 'value')
            setSelectedCollection(value)
          }}
        />
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
