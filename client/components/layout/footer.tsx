import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-soft-black text-off-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-royal-blue to-sky-blue flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Sierra<span className="text-sky-blue">Stay</span>
              </span>
            </div>
            <p className="text-slate-gray text-sm">
              Discover the beauty of Sierra Leone through our curated selection of hotels and guesthouses.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-slate-gray hover:text-sky-blue cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-slate-gray hover:text-sky-blue cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-slate-gray hover:text-sky-blue cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-warm-gold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/hotels" className="block text-slate-gray hover:text-sky-blue transition-colors">
                Browse Hotels
              </Link>
              <Link href="/destinations" className="block text-slate-gray hover:text-sky-blue transition-colors">
                Destinations
              </Link>
              <Link href="/about" className="block text-slate-gray hover:text-sky-blue transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-slate-gray hover:text-sky-blue transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-warm-gold">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-slate-gray hover:text-sky-blue transition-colors">
                Help Center
              </Link>
              <Link href="/booking-policy" className="block text-slate-gray hover:text-sky-blue transition-colors">
                Booking Policy
              </Link>
              <Link href="/privacy" className="block text-slate-gray hover:text-sky-blue transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-slate-gray hover:text-sky-blue transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-warm-gold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-sky-blue" />
                <span className="text-slate-gray text-sm">Freetown, Sierra Leone</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-sky-blue" />
                <span className="text-slate-gray text-sm">+232 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-sky-blue" />
                <span className="text-slate-gray text-sm">info@sierrastay.sl</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-gray mt-8 pt-8 text-center">
          <p className="text-slate-gray text-sm">
            © 2024 SierraStay. All rights reserved. Made with ❤️ for Sierra Leone.
          </p>
        </div>
      </div>
    </footer>
  )
}
