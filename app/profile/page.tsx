"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload, Home, FileText, User, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/lib/firebase/auth-context"
import { getUserProfile, updateUserProfile, uploadProfilePhoto } from "@/lib/firebase/user-service"
import { getProperties } from "@/lib/firebase/property-service"
import { getPlans } from "@/lib/firebase/plan-service"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [displayName, setDisplayName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [company, setCompany] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [properties, setProperties] = useState<any[]>([])
  const [plans, setPlans] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const loadProfile = async () => {
      try {
        const userProfile = await getUserProfile(user.uid)
        setProfile(userProfile)
        setDisplayName(userProfile.displayName || "")
        setPhoneNumber(userProfile.phoneNumber || "")
        setLocation(userProfile.location?.city || "")
        setBio(userProfile.bio || "")
        setCompany(userProfile.company || "")
        setLicenseNumber(userProfile.licenseNumber || "")

        // Load user's properties if they are a seller
        if (userProfile.userType === "seller") {
          const { properties } = await getProperties({ ownerId: user.uid })
          setProperties(properties)
        }

        // Load user's plans if they are an architect
        if (userProfile.userType === "architect") {
          const { plans } = await getPlans({ architectId: user.uid })
          setPlans(plans)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        toast({
          variant: "destructive",
          title: "Error loading profile",
          description: "There was an error loading your profile. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user, router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await updateUserProfile(user!.uid, {
        displayName,
        phoneNumber,
        location: { city: location },
        bio,
        company,
        licenseNumber,
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: "There was an error updating your profile. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    setIsSaving(true)

    try {
      const photoURL = await uploadProfilePhoto(file, user!.uid)
      setProfile({ ...profile, photoURL })

      toast({
        title: "Photo uploaded",
        description: "Your profile photo has been updated successfully.",
      })
    } catch (error) {
      console.error("Error uploading photo:", error)
      toast({
        variant: "destructive",
        title: "Error uploading photo",
        description: "There was an error uploading your photo. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: "There was an error logging out. Please try again.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="mb-4">Please log in to view your profile.</p>
            <Button onClick={() => router.push("/auth/login")}>Log In</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.photoURL || "/placeholder.svg"} />
                    <AvatarFallback className="bg-teal-600 text-white text-xl">
                      {profile.displayName?.charAt(0) || user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer"
                  >
                    <Upload className="h-4 w-4 text-teal-600" />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePhotoUpload}
                    />
                  </label>
                </div>
                <h3 className="font-medium text-lg">{profile.displayName}</h3>
                <p className="text-sm text-gray-600">{profile.email}</p>
                <div className="mt-2 px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                  {profile.userType === "buyer"
                    ? "Buyer"
                    : profile.userType === "seller"
                      ? "Seller"
                      : profile.userType === "architect"
                        ? "Architect"
                        : "User"}
                </div>
              </div>

              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Button>
                {profile.userType === "seller" && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => router.push("/profile/properties")}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    My Properties
                  </Button>
                )}
                {profile.userType === "architect" && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => router.push("/profile/plans")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    My Plans
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push("/profile/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              {profile.userType === "seller" && <TabsTrigger value="properties">My Properties</TabsTrigger>}
              {profile.userType === "architect" && <TabsTrigger value="plans">My Plans</TabsTrigger>}
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Full Name</Label>
                        <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      </div>
                    </div>

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

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                      />
                    </div>

                    {profile.userType === "architect" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company/Firm Name</Label>
                          <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">Professional License Number</Label>
                          <Input
                            id="licenseNumber"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {profile.userType === "seller" && (
              <TabsContent value="properties">
                <Card>
                  <CardHeader>
                    <CardTitle>My Properties</CardTitle>
                    <CardDescription>Manage your property listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {properties.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You haven't listed any properties yet.</p>
                        <Button onClick={() => router.push("/post-property")}>Add Property</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Property listings would go here */}
                        <Button onClick={() => router.push("/post-property")}>Add New Property</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {profile.userType === "architect" && (
              <TabsContent value="plans">
                <Card>
                  <CardHeader>
                    <CardTitle>My Plans</CardTitle>
                    <CardDescription>Manage your infrastructure plans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {plans.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You haven't uploaded any plans yet.</p>
                        <Button onClick={() => router.push("/post-plan")}>Upload Plan</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Plan listings would go here */}
                        <Button onClick={() => router.push("/post-plan")}>Upload New Plan</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={user.email || ""} disabled />
                    <p className="text-xs text-gray-500">To change your email, please contact support.</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Button variant="outline" onClick={() => router.push("/auth/reset-password")}>
                      Change Password
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Notification Preferences</Label>
                    <div className="space-y-2">{/* Notification preferences would go here */}</div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
