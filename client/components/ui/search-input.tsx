"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
  className?: string
  suggestions?: string[]
}

export function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  className,
  suggestions = [],
}: SearchInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleClear = () => {
    onChange("")
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
    onSearch?.()
  }

  const filteredSuggestions = suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()) && s !== value)

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-10"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
          {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
