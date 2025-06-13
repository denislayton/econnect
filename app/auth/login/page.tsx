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
import { Separator } from "@/components/ui/separator"
import { Home, Eye, EyeOff, Phone, Mail, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/firebase/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (loginMethod === "email") {
        await signIn(email, password)
        toast({
          title: "Login successful",
          description: "Welcome back to Estate Connect!",
        })
        router.push("/")
      } else {
        // Phone authentication would be implemented here
        // For now, show an error
        toast({
          variant: "destructive",
          title: "Not implemented",
          description: "Phone authentication is not yet implemented.",
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600">
              <Home className="h-7 w-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Estate Connect account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Login Method Toggle */}
          <div className="flex rounded-lg border p-1">
            <Button
              variant={loginMethod === "email" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setLoginMethod("email")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button
              variant={loginMethod === "phone" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setLoginMethod("phone")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </Button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email/Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="identifier">{loginMethod === "email" ? "Email Address" : "Phone Number"}</Label>
              <Input
                id="identifier"
                type={loginMethod === "email" ? "email" : "tel"}
                placeholder={loginMethod === "email" ? "Enter your email" : "+256 700 123 456"}
                value={loginMethod === "email" ? email : phone}
                onChange={(e) => (loginMethod === "email" ? setEmail(e.target.value) : setPhone(e.target.value))}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-teal-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Separator />

          {/* Guest Access */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">Don't have an account yet?</p>
            <div className="space-y-2">
              <Link href="/auth/register">
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  Continue as Guest
                </Button>
              </Link>
            </div>
          </div>

          {/* Guest Limitations Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Guest Access Limitations</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Browse all properties and plans</li>
              <li>• View images and descriptions</li>
              <li>• Cannot contact sellers</li>
              <li>• Cannot download plan files</li>
              <li>• Cannot post listings</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
