"use client"

import { Toaster } from "./toaster"

export function ToastProvider() {
  return <Toaster position="top-right" expand={false} richColors closeButton />
}
