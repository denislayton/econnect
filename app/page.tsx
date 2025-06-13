"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Search,
  Home,
  Building,
  TreePine,
  FileText,
  Star,
  Heart,
  Eye,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Users,
  Award,
  Shield,
  Plus,
  User as UserIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredProperties = [
  // ... your featuredProperties array ...
]

const categories = [
  // ... your categories array ...
]

const testimonials = [
  // ... your testimonials array ...
]

export default function ModernHomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Fetch users from backend
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {/* ... (your Hero Section code here) ... */}

      {/* Categories Section */}
      {/* ... (your Categories Section code here) ... */}

      {/* Featured Properties */}
      {/* ... (your Featured Properties Section code here) ... */}

      {/* Stats Section */}
      {/* ... (your Stats Section code here) ... */}

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who found their perfect property with us
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial]?.content}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-lg font-bold">
                      {testimonials[currentTestimonial]?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonials[currentTestimonial]?.name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial]?.role}</div>
                  </div>
                </div>
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? "bg-teal-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- Users Section --- */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Users</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These are some of the amazing people using Estate Connect!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {users.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No users found.</div>
            ) : (
              users.map((user: any) => (
                <Card key={user.id} className="border-0 shadow-lg bg-gray-50">
                  <CardContent className="flex flex-col items-center p-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-4">
                      <UserIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500 mt-1">Estate Connect User</div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* ... (your CTA Section code here) ... */}
    </div>
  )
}