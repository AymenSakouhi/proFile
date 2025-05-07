'use client'

import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavBar = () => {
  const pathname = usePathname()

  const pathParts = pathname.split('/').filter(Boolean)

  const breadcrumbs = pathParts.map((part, idx) => {
    const href = '/' + pathParts.slice(0, idx + 1)
    const isLast = idx === pathParts.length - 1

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem className={idx === 0 ? 'hidden md:block' : ''}>
          {isLast ? (
            <BreadcrumbPage>{part}</BreadcrumbPage>
          ) : (
            // <BreadcrumbLink>
            <Link href={href}>{part}</Link>
            // </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator className={'hidden md:block'} />}
      </React.Fragment>
    )
  })

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}

export default NavBar
