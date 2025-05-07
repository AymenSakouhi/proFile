import React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import NavBar from '@/components/navar'

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard
