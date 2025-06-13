import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Estate Connect</span>
            </div>
            <p className="text-gray-300">
              Uganda's leading property listing and infrastructure plan marketplace. Connecting buyers, sellers, and
              architects across the country.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/properties" className="block text-gray-300 hover:text-white transition-colors">
                Browse Properties
              </Link>
              <Link href="/plans" className="block text-gray-300 hover:text-white transition-colors">
                Infrastructure Plans
              </Link>
              <Link href="/post-property" className="block text-gray-300 hover:text-white transition-colors">
                Post Property
              </Link>
              <Link href="/pricing" className="block text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Property Types</h3>
            <div className="space-y-2">
              <Link href="/properties?category=land" className="block text-gray-300 hover:text-white transition-colors">
                Land for Sale
              </Link>
              <Link href="/properties?category=sale" className="block text-gray-300 hover:text-white transition-colors">
                Houses for Sale
              </Link>
              <Link href="/properties?category=rent" className="block text-gray-300 hover:text-white transition-colors">
                Houses for Rent
              </Link>
              <Link
                href="/properties?category=condo"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Condominiums
              </Link>
              <Link
                href="/properties?category=plans"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Architectural Plans
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-teal-400" />
                <span className="text-gray-300">+256 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-teal-400" />
                <span className="text-gray-300">info@estateconnect.ug</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-teal-400" />
                <span className="text-gray-300">Kampala, Uganda</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <p className="text-sm text-gray-300">Get the latest property updates</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button className="bg-teal-600 hover:bg-teal-700">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">© 2024 Estate Connect. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
