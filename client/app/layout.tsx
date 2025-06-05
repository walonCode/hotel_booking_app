import type React from "react"
import type { Metadata } from "next/metadata"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast-provider"
import { AuthProvider } from "@/lib/context/auth-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ChatbotButton from "@/components/chatbot/chatbot-button"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "StayEase - Hotel & Guesthouse Booking Platform",
    template: "%s | StayEase",
  },
  description:
    "Find and book the perfect accommodation for your next trip with StayEase. Discover hotels and guesthouses worldwide with the best prices and instant confirmation.",
  keywords: ["hotel booking", "accommodation", "travel", "guesthouse", "vacation rental"],
  authors: [{ name: "StayEase Team" }],
  creator: "StayEase",
  publisher: "StayEase",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "StayEase - Hotel & Guesthouse Booking Platform",
    description: "Find and book the perfect accommodation for your next trip",
    siteName: "StayEase",
  },
  twitter: {
    card: "summary_large_image",
    title: "StayEase - Hotel & Guesthouse Booking Platform",
    description: "Find and book the perfect accommodation for your next trip",
    creator: "@stayease",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <ChatbotButton />
              </div>
              <ToastProvider />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
