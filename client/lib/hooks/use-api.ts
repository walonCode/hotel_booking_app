"use client"

import { useState, useEffect, useCallback } from "react"
import type { ApiResponse } from "../types"

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function useApi<T>(apiCall: () => Promise<ApiResponse<T>>, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiCall()

      if (response.success && response.data) {
        setData(response.data)
        options.onSuccess?.(response.data)
      } else {
        const errorMessage = response.error?.message || "An error occurred"
        setError(errorMessage)
        options.onError?.(response.error)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      options.onError?.(err)
    } finally {
      setLoading(false)
    }
  }, [apiCall, options])

  useEffect(() => {
    if (options.immediate !== false) {
      execute()
    }
  }, [execute, options.immediate])

  const refetch = useCallback(() => {
    execute()
  }, [execute])

  return {
    data,
    loading,
    error,
    execute,
    refetch,
  }
}

export function useMutation<T, P = any>(apiCall: (params: P) => Promise<ApiResponse<T>>, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(
    async (params: P) => {
      try {
        setLoading(true)
        setError(null)

        const response = await apiCall(params)

        if (response.success && response.data) {
          setData(response.data)
          options.onSuccess?.(response.data)
          return response.data
        } else {
          const errorMessage = response.error?.message || "An error occurred"
          setError(errorMessage)
          options.onError?.(response.error)
          throw new Error(errorMessage)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
        setError(errorMessage)
        options.onError?.(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiCall, options],
  )

  return {
    data,
    loading,
    error,
    mutate,
  }
}
