"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  fallbackClassName?: string
  priority?: boolean
  sizes?: string
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  className,
  fallbackClassName,
  priority,
  sizes,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-gray-100 text-gray-400", fallbackClassName, className)}
        style={!fill ? { width, height } : undefined}
      >
        <ImageIcon className="h-8 w-8" />
      </div>
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setHasError(true)}
    />
  )
}
