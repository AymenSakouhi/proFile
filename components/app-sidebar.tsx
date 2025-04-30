'use client'
import * as React from 'react'

import { SearchForm } from '@/components/search-form'
import { NavUser } from './nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from '@/components/ui/sidebar'
import Link from 'next/link'

import { useSession } from '@/lib/auth-client'
import { File } from 'lucide-react'

// This is sample data.
const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg',
  },
  navMain: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Documentation',
          url: '/documentation',
        },
        {
          title: 'Upload your file',
          url: '/dashboard/fileupload',
          isActive: true,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useSession()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex my-2 gap-4 pl-2">
          <File className="size-4" />
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">PROFILE</span>
          </div>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
