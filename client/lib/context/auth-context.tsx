"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "../types"
import { apiClient } from "../api-client"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setIsLoading(false)
        return
      }

      const response = await apiClient.getProfile()
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        localStorage.removeItem("auth_token")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("auth_token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await apiClient.login({ email, password })

    if (response.success && response.data) {
      const { user, token } = response.data as any
      localStorage.setItem("auth_token", token)
      setUser(user)
    } else {
      throw new Error(response.error?.message || "Login failed")
    }
  }

  const register = async (userData: any) => {
    const response = await apiClient.register(userData)

    if (response.success && response.data) {
      const { user, token } = response.data as any
      localStorage.setItem("auth_token", token)
      setUser(user)
    } else {
      throw new Error(response.error?.message || "Registration failed")
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("auth_token")
      setUser(null)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
