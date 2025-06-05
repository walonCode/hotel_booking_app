"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Settings, Calendar, LogOut, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface UserMenuProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
}

export function UserMenu({ user, isLoggedIn, onLogin, onLogout }: UserMenuProps) {
  const [notifications] = useState(3) // Mock notification count

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {notifications > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
        )}
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/bookings" className="cursor-pointer">
              <Calendar className="mr-2 h-4 w-4" />
              My Bookings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
