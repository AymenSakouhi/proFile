import React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import NavBar from '@/components/Navar'

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard
