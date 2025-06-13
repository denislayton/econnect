"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, MapPin, DollarSign, Home, FileText, Camera, X, AlertCircle } from "lucide-react"

export default function PostPropertyPage() {
  const [propertyType, setPropertyType] = useState("")
  const [listingType, setListingType] = useState("")
  const [currency, setCurrency] = useState("UGX")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { number: 1, title: "Property Type", description: "Choose what you're listing" },
    { number: 2, title: "Basic Details", description: "Property information" },
    { number: 3, title: "Location", description: "Where is it located" },
    { number: 4, title: "Media & Files", description: "Photos and documents" },
    { number: 5, title: "Pricing", description: "Set your price" },
    { number: 6, title: "Review", description: "Review and publish" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post Your Property</h1>
          <p className="text-gray-600">List your property or infrastructure plan on Estate Connect</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? "bg-teal-600 border-teal-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {step.number}
                </div>
                <div className="ml-3 hidden md:block">
                  <p
                    className={`text-sm font-medium ${currentStep >= step.number ? "text-teal-600" : "text-gray-400"}`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? "bg-teal-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>
              Step {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Property Type */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">What are you listing?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div
                      className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                        listingType === "sale" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                      }`}
                      onClick={() => setListingType("sale")}
                    >
                      <Home className="w-8 h-8 text-teal-600 mb-3" />
                      <h3 className="font-medium mb-2">Property for Sale</h3>
                      <p className="text-sm text-gray-600">Sell your property to buyers</p>
                    </div>
                    <div
                      className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                        listingType === "rent" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                      }`}
                      onClick={() => setListingType("rent")}
                    >
                      <Home className="w-8 h-8 text-green-600 mb-3" />
                      <h3 className="font-medium mb-2">Property for Rent</h3>
                      <p className="text-sm text-gray-600">Rent out your property</p>
                    </div>
                    <div
                      className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                        listingType === "plan" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                      }`}
                      onClick={() => setListingType("plan")}
                    >
                      <FileText className="w-8 h-8 text-purple-600 mb-3" />
                      <h3 className="font-medium mb-2">Infrastructure Plan</h3>
                      <p className="text-sm text-gray-600">Share architectural plans</p>
                    </div>
                  </div>
                </div>

                {listingType && listingType !== "plan" && (
                  <div>
                    <Label className="text-base font-medium">Property Category</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select property category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="commercial">Commercial Property</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {listingType === "plan" && (
                  <div>
                    <Label className="text-base font-medium">Plan Category</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select plan category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential Plans</SelectItem>
                        <SelectItem value="commercial">Commercial Plans</SelectItem>
                        <SelectItem value="industrial">Industrial Plans</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure Plans</SelectItem>
                        <SelectItem value="landscape">Landscape Plans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Basic Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input id="title" placeholder="e.g., Modern 3-Bedroom Villa with Garden" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input id="area" type="number" placeholder="2500" />
                  </div>
                </div>

                {listingType !== "plan" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5+">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5+">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parking">Parking Spaces</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">None</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your property in detail..." rows={4} />
                </div>

                {listingType !== "plan" && (
                  <div>
                    <Label className="text-base font-medium">Features & Amenities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {[
                        "Swimming Pool",
                        "Garden",
                        "Security",
                        "Furnished",
                        "Air Conditioning",
                        "Balcony",
                        "Garage",
                        "Generator",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={feature} />
                          <Label htmlFor={feature} className="text-sm">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="uganda">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uganda">Uganda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City/District</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kampala">Kampala</SelectItem>
                        <SelectItem value="wakiso">Wakiso</SelectItem>
                        <SelectItem value="mukono">Mukono</SelectItem>
                        <SelectItem value="entebbe">Entebbe</SelectItem>
                        <SelectItem value="jinja">Jinja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="Enter the property address" />
                </div>

                <div className="space-y-2">
                  <Label>Location Privacy</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="exact" name="location" value="exact" />
                      <Label htmlFor="exact">Show exact location</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="approximate" name="location" value="approximate" defaultChecked />
                      <Label htmlFor="approximate">Show approximate location</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="hidden" name="location" value="hidden" />
                      <Label htmlFor="hidden">Hide location (show only to interested buyers)</Label>
                    </div>
                  </div>
                </div>

                <Card className="bg-teal-50 border-teal-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-teal-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-teal-900">GPS Location</h4>
                        <p className="text-sm text-teal-700">
                          We'll automatically detect your location when you take photos, or you can manually pin it on
                          the map.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Media & Files */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">
                    {listingType === "plan" ? "Upload Plan Files" : "Property Photos"}
                  </Label>
                  <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {listingType === "plan" ? "Upload your plan files" : "Upload property photos"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {listingType === "plan"
                        ? "Supported formats: PDF, DWG, JPG, PNG, MP4, ZIP"
                        : "Drag and drop your photos here, or click to browse"}
                    </p>
                    <Button>
                      <Camera className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div>
                    <Label className="text-base font-medium">Uploaded Files</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative border rounded-lg p-4">
                          <div className="aspect-square bg-gray-100 rounded mb-2"></div>
                          <p className="text-sm truncate">File {index + 1}</p>
                          <Button size="sm" variant="ghost" className="absolute top-2 right-2 h-6 w-6 p-0">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {listingType === "plan" && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Plan File Guidelines</h4>
                          <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                            <li>• Files will be automatically watermarked for preview</li>
                            <li>• Include licensing and approval documents if available</li>
                            <li>• Maximum file size: 50MB per file</li>
                            <li>• High-quality files get better visibility</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 5: Pricing */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">{listingType === "rent" ? "Monthly Rent" : "Price"}</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder={
                          currency === "UGX"
                            ? listingType === "rent"
                              ? "3000000"
                              : "320000000"
                            : listingType === "rent"
                              ? "800"
                              : "85000"
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
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
                </div>

                {listingType === "rent" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="deposit" />
                      <Label htmlFor="deposit">Security deposit required</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="deposit-amount">Deposit Amount ({currency})</Label>
                        <Input
                          id="deposit-amount"
                          type="number"
                          placeholder={currency === "UGX" ? "6000000" : "1600"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lease-term">Minimum Lease Term</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 month</SelectItem>
                            <SelectItem value="3">3 months</SelectItem>
                            <SelectItem value="6">6 months</SelectItem>
                            <SelectItem value="12">12 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Listing Fee Information */}
                <Card className="bg-teal-50 border-teal-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-teal-900 mb-2">Listing Fee</h4>
                    <div className="space-y-2 text-sm text-teal-700">
                      {listingType === "sale" && <p>• Property sale listing fee: 2.5% of sale price</p>}
                      {listingType === "rent" && (
                        <p>• Rental listing fee: {currency === "UGX" ? "UGX 95,000" : "$25"} (one-time)</p>
                      )}
                      {listingType === "plan" && (
                        <p>• Plan listing fee: {currency === "UGX" ? "UGX 56,000" : "$15"} (one-time)</p>
                      )}
                      <p>• Payment via MTN Mobile Money or Airtel Money</p>
                      <p>• Fee charged only when listing is approved</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Review Your Listing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Property Details</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Type:</span> {listingType} - {propertyType}
                        </p>
                        <p>
                          <span className="font-medium">Title:</span> Modern 3-Bedroom Villa
                        </p>
                        <p>
                          <span className="font-medium">Location:</span> Kampala, Uganda
                        </p>
                        <p>
                          <span className="font-medium">Price:</span>{" "}
                          {currency === "UGX" ? "UGX 320,000,000" : "$85,000"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Listing Summary</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Photos:</span> 5 uploaded
                        </p>
                        <p>
                          <span className="font-medium">Features:</span> 3 bedrooms, 2 bathrooms
                        </p>
                        <p>
                          <span className="font-medium">Listing fee:</span>{" "}
                          {currency === "UGX" ? "UGX 8,000,000" : "$2,125"}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span> Ready to publish
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms-agree" />
                  <Label htmlFor="terms-agree" className="text-sm">
                    I agree to the Estate Connect Terms of Service and confirm that all information provided is
                    accurate.
                  </Label>
                </div>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-green-900 mb-2">Ready to Publish!</h4>
                    <p className="text-sm text-green-700">
                      Your listing will be reviewed by our team and published within 24 hours. You'll receive a
                      notification once it's live.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <div className="flex space-x-4">
                <Button variant="outline">Save Draft</Button>
                {currentStep < 6 ? (
                  <Button onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}>Next</Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700">Publish Listing</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
