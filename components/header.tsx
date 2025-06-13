"use client"

import { useState } from "react"
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
} from "lucide-react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context

  const propertyCategories = [
    { name: "Land", href: "/properties?category=land", icon: TreePine },
    { name: "Houses for Sale", href: "/properties?category=sale", icon: Home },
    { name: "Houses for Rent", href: "/properties?category=rent", icon: Home },
    { name: "Condominiums", href: "/properties?category=condo", icon: Building },
    { name: "Infrastructure Plans", href: "/properties?category=plans", icon: FileText },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Estate Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-teal-600">
              Home
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Properties</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {propertyCategories.map((category) => (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link
                            href={category.href}
                            className="flex items-center space-x-3 rounded-md p-3 hover:bg-accent"
                          >
                            <category.icon className="h-5 w-5 text-teal-600" />
                            <span className="font-medium">{category.name}</span>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/plans" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Plans Marketplace
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search properties..." className="pl-10" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">2</Badge>
                </Button>
                <Link href="/post-property">
                  <Button className="hidden sm:flex">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Property
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      Favorites
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search properties..." className="pl-10" />
                  </div>

                  <div className="space-y-2">
                    <Link href="/">
                      <Button variant="ghost" className="w-full justify-start">
                        <Home className="h-4 w-4 mr-2" />
                        Home
                      </Button>
                    </Link>
                    <h3 className="font-semibold">Property Categories</h3>
                    {propertyCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center space-x-3 rounded-md p-3 hover:bg-accent"
                      >
                        <category.icon className="h-5 w-5 text-teal-600" />
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <Link href="/plans">
                      <Button variant="ghost" className="w-full justify-start">
                        Plans Marketplace
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button variant="ghost" className="w-full justify-start">
                        About
                      </Button>
                    </Link>
                  </div>

                  {!isLoggedIn && (
                    <div className="pt-4 border-t space-y-2">
                      <Link href="/auth/login">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button className="w-full">Get Started</Button>
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
