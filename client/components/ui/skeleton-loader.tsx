import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
}

export function HotelCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  )
}

export function BookingSummarySkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
