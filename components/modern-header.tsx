"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  Menu,
  User,
  Heart,
  Plus,
  Home,
  Building,
  TreePine,
  FileText,
  Bell,
  Settings,
  LogOut,
  MapPin,
} from "lucide-react"

export function ModernHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const propertyCategories = [
    { name: "Land", href: "/properties?category=land", icon: TreePine, count: "1,234" },
    { name: "Houses for Sale", href: "/properties?category=sale", icon: Home, count: "856" },
    { name: "Houses for Rent", href: "/properties?category=rent", icon: Home, count: "678" },
    { name: "Condominiums", href: "/properties?category=condo", icon: Building, count: "432" },
    { name: "Infrastructure Plans", href: "/properties?category=plans", icon: FileText, count: "234" },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                Estate Connect
              </span>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>Uganda</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium transition-all duration-200 hover:text-teal-600 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Properties</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] gap-3 p-6">
                      <div className="row-span-3">
                        <h3 className="text-lg font-semibold mb-4">Browse Properties</h3>
                        <div className="grid gap-3">
                          {propertyCategories.map((category) => (
                            <NavigationMenuLink key={category.name} asChild>
                              <Link
                                href={category.href}
                                className="group flex items-center justify-between rounded-lg p-4 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 transition-all duration-200"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 rounded-lg bg-teal-100 group-hover:bg-teal-200 transition-colors">
                                    <category.icon className="h-5 w-5 text-teal-600" />
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900">{category.name}</span>
                                    <p className="text-sm text-gray-500">{category.count} listings</p>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                                  {category.count}
                                </Badge>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/plans"
              className="text-sm font-medium transition-all duration-200 hover:text-teal-600 relative group"
            >
              Plans Marketplace
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium transition-all duration-200 hover:text-teal-600 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden xl:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                placeholder="Search properties, locations..."
                className="pl-12 h-12 bg-white/50 backdrop-blur-sm border-gray-200/50 focus:bg-white focus:border-teal-300 transition-all duration-200"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative group">
                  <Heart className="h-5 w-5 group-hover:text-red-500 transition-colors" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-red-500 animate-pulse">
                    3
                  </Badge>
                </Button>

                <Button variant="ghost" size="icon" className="relative group">
                  <Bell className="h-5 w-5 group-hover:text-orange-500 transition-colors" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-orange-500 animate-pulse">
                    2
                  </Badge>
                </Button>

                <Link href="/post-property">
                  <Button className="hidden sm:flex bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Property
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl">
                    <DropdownMenuItem className="hover:bg-teal-50">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50">
                      <Heart className="mr-2 h-4 w-4" />
                      Favorites
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-red-50 text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="hover:bg-teal-50 hover:text-teal-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search properties..." className="pl-10" />
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-50 transition-colors"
                    >
                      <Home className="h-5 w-5 text-teal-600" />
                      <span className="font-medium">Home</span>
                    </Link>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Property Categories</h3>
                      <div className="space-y-2">
                        {propertyCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-teal-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <category.icon className="h-5 w-5 text-teal-600" />
                              <span>{category.name}</span>
                            </div>
                            <Badge variant="secondary">{category.count}</Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {!isLoggedIn && (
                    <div className="pt-6 border-t space-y-3">
                      <Link href="/auth/login">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700">Get Started</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
