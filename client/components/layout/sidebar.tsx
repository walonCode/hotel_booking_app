"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { MapPin } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()
  const [notifications] = useState(3)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center space-x-2 px-4 py-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-royal-blue to-sky-blue flex items-center justify-center">
              <MapPin\
