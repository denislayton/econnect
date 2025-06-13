"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Home, Eye, EyeOff, User, Building, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/firebase/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState<"buyer" | "seller" | "architect">("buyer")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [company, setCompany] = useState("")
  const [license, setLicense] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      })
      return
    }

    if (!agreeToTerms) {
      toast({
        variant: "destructive",
        title: "Terms and Conditions",
        description: "You must agree to the Terms of Service and Privacy Policy.",
      })
      return
    }

    setIsLoading(true)

    try {
      const fullName = `${firstName} ${lastName}`.trim()
      await signUp(email, password, fullName, accountType)

      toast({
        title: "Account created successfully",
        description: "Welcome to Estate Connect!",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "There was an error creating your account.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600">
              <Home className="h-7 w-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Join Estate Connect</CardTitle>
          <CardDescription>Create your account to start buying, selling, or sharing plans</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Account Type Selection */}
          <div className="space-y-3">
            <Label>I want to:</Label>
            <div className="grid grid-cols-1 gap-3">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  accountType === "buyer" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                }`}
                onClick={() => setAccountType("buyer")}
              >
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-teal-600" />
                  <div>
                    <div className="font-medium">Buy or Rent Properties</div>
                    <div className="text-sm text-gray-600">Find your perfect home or investment</div>
                  </div>
                </div>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  accountType === "seller" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                }`}
                onClick={() => setAccountType("seller")}
              >
                <div className="flex items-center space-x-3">
                  <Home className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Sell or Rent Properties</div>
                    <div className="text-sm text-gray-600">List your properties for sale or rent</div>
                  </div>
                </div>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  accountType === "architect" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                }`}
                onClick={() => setAccountType("architect")}
              >
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Share Infrastructure Plans</div>
                    <div className="text-sm text-gray-600">Sell architectural and engineering plans</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+256 700 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kampala">Kampala</SelectItem>
                  <SelectItem value="wakiso">Wakiso</SelectItem>
                  <SelectItem value="mukono">Mukono</SelectItem>
                  <SelectItem value="entebbe">Entebbe</SelectItem>
                  <SelectItem value="jinja">Jinja</SelectItem>
                  <SelectItem value="mbarara">Mbarara</SelectItem>
                  <SelectItem value="gulu">Gulu</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Professional Information (for architects) */}
            {accountType === "architect" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Firm Name</Label>
                  <Input
                    id="company"
                    placeholder="Your Architecture Firm"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Professional License Number</Label>
                  <Input
                    id="license"
                    placeholder="License number (optional)"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                className="mt-1"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-teal-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-teal-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Create Account Button */}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <Separator />

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-teal-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
