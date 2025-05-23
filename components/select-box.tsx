import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CollectionsWithImagesType } from '@/app/dashboard/fileupload/page'

type SelectBoxProps = {
  name: string
  items: CollectionsWithImagesType[] | undefined
  handleValueChange: (value: string) => void
  className: string
}

export function SelectBox({
  name,
  items,
  handleValueChange,
  className,
}: SelectBoxProps) {
  if (!items)
    return (
      <p className="text-sm text-red-500">
        There is no items to render the selectbox
      </p>
    )
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger {...{ className }}>
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{name}</SelectLabel>
          {items?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
