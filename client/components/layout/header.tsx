"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, User, MapPin } from "lucide-react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-royal-blue to-sky-blue flex items-center justify-center">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-soft-black">
            Sierra<span className="text-royal-blue">Stay</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/hotels" className="text-slate-gray hover:text-royal-blue transition-colors">
            Hotels
          </Link>
          <Link href="/destinations" className="text-slate-gray hover:text-royal-blue transition-colors">
            Destinations
          </Link>
          <Link href="/about" className="text-slate-gray hover:text-royal-blue transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-slate-gray hover:text-royal-blue transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search and User Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-gray" />
              <Input placeholder="Search hotels..." className="pl-10 w-64" onFocus={() => setIsSearchOpen(true)} />
            </div>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/bookings">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/favorites">Favorites</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">Admin Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-gray" />
                  <Input placeholder="Search hotels..." className="pl-10" />
                </div>

                <nav className="flex flex-col space-y-4">
                  <Link href="/hotels" className="text-slate-gray hover:text-royal-blue transition-colors">
                    Hotels
                  </Link>
                  <Link href="/destinations" className="text-slate-gray hover:text-royal-blue transition-colors">
                    Destinations
                  </Link>
                  <Link href="/about" className="text-slate-gray hover:text-royal-blue transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-slate-gray hover:text-royal-blue transition-colors">
                    Contact
                  </Link>
                </nav>

                <div className="border-t pt-4">
                  <div className="flex flex-col space-y-2">
                    <Link href="/profile">
                      <Button variant="ghost" className="w-full justify-start">
                        My Profile
                      </Button>
                    </Link>
                    <Link href="/bookings">
                      <Button variant="ghost" className="w-full justify-start">
                        My Bookings
                      </Button>
                    </Link>
                    <Link href="/admin">
                      <Button variant="ghost" className="w-full justify-start">
                        Admin Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
