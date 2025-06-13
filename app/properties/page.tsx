"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  MapPin,
  Search,
  Heart,
  Eye,
  Bed,
  Bath,
  Square,
  Star,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  TrendingUp,
  Shield,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const properties = [
  {
    id: 1,
    title: "Modern 3-Bedroom Villa with Garden",
    location: "Kampala, Central Region",
    price: 320000000,
    priceUSD: 85000,
    type: "sale",
    category: "Houses for Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 2500,
    image: "/images/property-1.jpg",
    featured: true,
    likes: 24,
    views: 156,
    description: "Beautiful modern villa with spacious garden and parking",
    agent: "John Mukasa",
    verified: true,
    trending: true,
  },
  {
    id: 2,
    title: "Prime Commercial Land",
    location: "Entebbe Road, Wakiso",
    price: 450000000,
    priceUSD: 120000,
    type: "sale",
    category: "Land",
    area: 5000,
    image: "/images/land-1.jpg",
    featured: false,
    likes: 18,
    views: 89,
    description: "Strategic location for commercial development",
    agent: "Sarah Nambi",
    verified: true,
    trending: false,
  },
  {
    id: 3,
    title: "Luxury Apartment Plans - High Rise",
    location: "Digital Download",
    price: 1120000,
    priceUSD: 299,
    type: "plan",
    category: "Infrastructure Plans",
    format: "PDF, CAD, 3D",
    image: "/images/plans-1.jpg",
    featured: true,
    likes: 45,
    views: 234,
    description: "Complete architectural plans for luxury apartments",
    agent: "Arch Studio Ltd",
    verified: true,
    trending: true,
  },
  {
    id: 4,
    title: "Cozy 2-Bedroom Apartment",
    location: "Nakasero, Kampala",
    price: 3000000,
    priceUSD: 800,
    type: "rent",
    category: "Houses for Rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    image: "/images/property-2.jpg",
    featured: false,
    likes: 12,
    views: 67,
    description: "Furnished apartment in prime location",
    agent: "David Ssali",
    verified: true,
    trending: false,
  },
  {
    id: 5,
    title: "Penthouse Condominium",
    location: "Kololo, Kampala",
    price: 940000000,
    priceUSD: 250000,
    type: "sale",
    category: "Condominiums",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: "/images/property-3.jpg",
    featured: true,
    likes: 67,
    views: 345,
    description: "Luxury penthouse with panoramic city views",
    agent: "Grace Nakato",
    verified: true,
    trending: true,
  },
  {
    id: 6,
    title: "Agricultural Land - Fertile Soil",
    location: "Mukono District",
    price: 169000000,
    priceUSD: 45000,
    type: "sale",
    category: "Land",
    area: 10000,
    image: "/images/land-2.jpg",
    featured: false,
    likes: 23,
    views: 123,
    description: "Perfect for farming and agricultural projects",
    agent: "Peter Kato",
    verified: true,
    trending: false,
  },
]

export default function ModernPropertiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 2000000000])
  const [currency, setCurrency] = useState("UGX")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || property.category === selectedCategory
    const matchesType = selectedType === "all" || property.type === selectedType
    const priceToCheck = currency === "UGX" ? property.price : property.priceUSD
    const matchesPrice = priceToCheck >= priceRange[0] && priceToCheck <= priceRange[1]

    return matchesSearch && matchesCategory && matchesType && matchesPrice
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (currency === "UGX" ? a.price : a.priceUSD) - (currency === "UGX" ? b.price : b.priceUSD)
      case "price-high":
        return (currency === "UGX" ? b.price : b.priceUSD) - (currency === "UGX" ? a.price : a.priceUSD)
      case "popular":
        return b.views - a.views
      default:
        return b.id - a.id
    }
  })

  const formatPrice = (price: number, priceUSD: number) => {
    if (currency === "UGX") {
      return `UGX ${price.toLocaleString()}`
    }
    return `$${priceUSD.toLocaleString()}`
  }

  const maxPrice = currency === "UGX" ? 2000000000 : 500000

  const features = ["Parking", "Garden", "Security", "Furnished", "Swimming Pool", "Gym", "Balcony", "Generator"]

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Discover Your Perfect Property</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Browse {properties.length} verified properties and infrastructure plans across Uganda
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search properties, locations..."
                      className="pl-12 h-12 border-0 bg-gray-50 focus:bg-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-12 border-0 bg-gray-50 focus:bg-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                      <SelectItem value="Houses for Sale">Houses for Sale</SelectItem>
                      <SelectItem value="Houses for Rent">Houses for Rent</SelectItem>
                      <SelectItem value="Condominiums">Condominiums</SelectItem>
                      <SelectItem value="Infrastructure Plans">Infrastructure Plans</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="h-12 border-0 bg-gray-50 focus:bg-white">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="plan">Plans</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="border-t pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Currency</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UGX">Uganda Shillings (UGX)</SelectItem>
                            <SelectItem value="USD">US Dollars (USD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Location</Label>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="kampala">Kampala</SelectItem>
                            <SelectItem value="wakiso">Wakiso</SelectItem>
                            <SelectItem value="mukono">Mukono</SelectItem>
                            <SelectItem value="entebbe">Entebbe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Sort By</Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-4 block">Price Range ({currency})</Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={maxPrice}
                        min={0}
                        step={currency === "UGX" ? 1000000 : 1000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>
                          {currency === "UGX"
                            ? `UGX ${priceRange[0].toLocaleString()}`
                            : `$${priceRange[0].toLocaleString()}`}
                        </span>
                        <span>
                          {currency === "UGX"
                            ? `UGX ${priceRange[1].toLocaleString()}`
                            : `$${priceRange[1].toLocaleString()}`}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-4 block">Features</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {features.map((feature) => (
                          <div
                            key={feature}
                            onClick={() => toggleFeature(feature)}
                            className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedFeatures.includes(feature)
                                ? "bg-teal-50 border-teal-300 text-teal-700"
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <Checkbox checked={selectedFeatures.includes(feature)} onChange={() => {}} />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("all")
                          setSelectedType("all")
                          setSelectedLocation("all")
                          setPriceRange([0, maxPrice])
                          setSelectedFeatures([])
                        }}
                      >
                        Reset Filters
                      </Button>
                      <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{sortedProperties.length} Properties Found</h2>
            <p className="text-gray-600">
              {selectedCategory !== "all" && `${selectedCategory} • `}
              {selectedType !== "all" && `${selectedType} • `}
              Showing best matches
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex border rounded-lg bg-white shadow-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "all" || selectedType !== "all" || selectedFeatures.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-8">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="px-3 py-1">
                {selectedCategory}
                <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => setSelectedCategory("all")} />
              </Badge>
            )}
            {selectedType !== "all" && (
              <Badge variant="secondary" className="px-3 py-1">
                {selectedType}
                <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => setSelectedType("all")} />
              </Badge>
            )}
            {selectedFeatures.map((feature) => (
              <Badge key={feature} variant="secondary" className="px-3 py-1">
                {feature}
                <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => toggleFeature(feature)} />
              </Badge>
            ))}
          </div>
        )}

        {/* Properties Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {sortedProperties.map((property) => (
            <Card
              key={property.id}
              className={`overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white group ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div className={viewMode === "list" ? "w-80 flex-shrink-0" : "relative"}>
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                    viewMode === "list" ? "w-full h-full" : "w-full h-64"
                  }`}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge
                    className={`${
                      property.type === "sale"
                        ? "bg-green-500 hover:bg-green-600"
                        : property.type === "rent"
                          ? "bg-teal-500 hover:bg-teal-600"
                          : "bg-purple-500 hover:bg-purple-600"
                    } text-white border-0 shadow-lg`}
                  >
                    {property.type === "sale" ? "For Sale" : property.type === "rent" ? "For Rent" : "Plan"}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white border-0 shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {property.trending && (
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  {property.verified && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-lg">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg">
                    <Heart className="w-4 h-4 hover:text-red-500 transition-colors" />
                  </Button>
                </div>
              </div>

              <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
                    {property.title}
                  </h3>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(property.price, property.priceUSD)}
                    {property.type === "rent" && "/month"}
                  </div>
                  {currency === "UGX" && (
                    <div className="text-sm text-gray-500">
                      ${property.priceUSD.toLocaleString()}
                      {property.type === "rent" && "/month"}
                    </div>
                  )}
                  {currency === "USD" && (
                    <div className="text-sm text-gray-500">
                      UGX {property.price.toLocaleString()}
                      {property.type === "rent" && "/month"}
                    </div>
                  )}
                </div>

                {property.bedrooms && (
                  <div className="flex justify-between text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1 text-teal-500" />
                      {property.bedrooms} beds
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1 text-teal-500" />
                      {property.bathrooms} baths
                    </span>
                    <span className="flex items-center">
                      <Square className="w-4 h-4 mr-1 text-teal-500" />
                      {property.area} sq ft
                    </span>
                  </div>
                )}

                {property.format && (
                  <div className="text-sm text-gray-600 mb-4 p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-purple-700">Format: </span>
                    {property.format}
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{property.description}</p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center hover:text-red-500 transition-colors cursor-pointer">
                      <Heart className="w-4 h-4 mr-1" />
                      {property.likes}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {property.views}
                    </span>
                  </div>
                  <Link href={`/property/${property.id}`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">
                      {property.agent
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{property.agent}</p>
                    <p className="text-xs text-gray-500">Verified Agent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center space-x-2">
            <Button variant="outline" disabled className="hover:bg-gray-50">
              Previous
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">1</Button>
            <Button variant="outline" className="hover:bg-gray-50">
              2
            </Button>
            <Button variant="outline" className="hover:bg-gray-50">
              3
            </Button>
            <Button variant="outline" className="hover:bg-gray-50">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
