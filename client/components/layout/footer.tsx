import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-deep-blue to-deep-blue/95 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-poppins text-3xl font-bold">
                Stay<span className="text-sky-blue">Ease</span>
              </span>
              <p className="text-sm text-gray-300 mt-2">Sierra Leone's Premier Booking Platform</p>
            </div>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Your trusted partner for finding perfect accommodations across Sierra Leone. We make travel booking
              simple, secure, and enjoyable for every Sierra Leonean and visitor.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/hotels" className="text-gray-300 hover:text-white transition-colors">
                  Find Hotels
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-300 hover:text-white transition-colors">
                  Popular Destinations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="text-gray-300 hover:text-white transition-colors">
                  Payment Methods
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
            <p className="mb-4 text-gray-300">Subscribe for exclusive deals and Sierra Leone travel tips.</p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-sky-blue"
              />
              <Button type="submit" variant="gradient" className="w-full">
                Subscribe
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@stayease.sl</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+232 76 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Freetown, Sierra Leone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} StayEase Sierra Leone. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/payment-methods" className="hover:text-white transition-colors">
                Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
