"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Hotels", href: "/hotels" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock auth state

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
            : "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100",
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                <span className="text-sm font-bold text-white">SE</span>
              </div>
              <span className="hidden font-poppins text-xl font-bold bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 sm:block">
                StayEase
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group",
                  pathname === item.href
                    ? "text-blue-600 bg-blue-50 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50",
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full" />
                )}
                <div className="absolute inset-0 rounded-lg bg-blue-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Desktop user menu */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-3">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white border-2 border-white">
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>

                {/* User dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-medium">
                          {mockUser.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden text-sm font-medium text-gray-700 xl:block">{mockUser.name}</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setIsLoggedIn(true)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                  <span className="text-sm font-bold text-white">SE</span>
                </div>
                <span className="font-poppins text-xl font-bold bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
                  StayEase
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-3 text-base font-semibold leading-7 transition-colors",
                        pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-900 hover:bg-gray-50",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* User section */}
                <div className="py-6">
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      {/* User info */}
                      <div className="flex items-center space-x-3 px-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white font-medium">
                            {mockUser.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{mockUser.name}</p>
                          <p className="text-sm text-gray-500 truncate">{mockUser.email}</p>
                        </div>
                        <Badge className="bg-red-500 text-white">3</Badge>
                      </div>

                      {/* Menu items */}
                      <div className="space-y-1">
                        <Link
                          href="/dashboard"
                          className="flex items-center rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="mr-3 h-5 w-5" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="mr-3 h-5 w-5" />
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            setIsLoggedIn(false)
                            setMobileMenuOpen(false)
                          }}
                          className="flex w-full items-center rounded-lg px-3 py-2.5 text-base font-semibold text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="mr-3 h-5 w-5" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-base font-semibold"
                        onClick={() => {
                          setIsLoggedIn(true)
                          setMobileMenuOpen(false)
                        }}
                      >
                        Log in
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-semibold"
                        onClick={() => {
                          setIsLoggedIn(true)
                          setMobileMenuOpen(false)
                        }}
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
