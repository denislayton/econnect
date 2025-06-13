"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, DollarSign, Shield, Home, AlertTriangle, CheckCircle, XCircle, Eye, Download, Plus } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-teal-600",
  },
  {
    title: "Active Listings",
    value: "1,234",
    change: "+8%",
    icon: Home,
    color: "text-green-600",
  },
  {
    title: "Monthly Revenue",
    value: "UGX 170M",
    valueUSD: "$45,230",
    change: "+23%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Plan Downloads",
    value: "567",
    change: "+15%",
    icon: Download,
    color: "text-orange-600",
  },
]

const pendingListings = [
  {
    id: 1,
    title: "Modern 3-Bedroom Villa",
    user: "John Doe",
    type: "sale",
    price: "UGX 320M",
    priceUSD: "$85,000",
    status: "pending",
    submitted: "2 hours ago",
  },
  {
    id: 2,
    title: "Commercial Land Plot",
    user: "Jane Smith",
    type: "sale",
    price: "UGX 450M",
    priceUSD: "$120,000",
    status: "pending",
    submitted: "4 hours ago",
  },
  {
    id: 3,
    title: "Luxury Apartment Plans",
    user: "Arch Studio Ltd",
    type: "plan",
    price: "UGX 1.1M",
    priceUSD: "$299",
    status: "pending",
    submitted: "1 day ago",
  },
]

const recentTransactions = [
  {
    id: 1,
    user: "Alice Johnson",
    type: "Listing Fee",
    amount: "UGX 190,000",
    amountUSD: "$50",
    method: "MTN Mobile Money",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: 2,
    user: "Bob Wilson",
    type: "Plan Download",
    amount: "UGX 95,000",
    amountUSD: "$25",
    method: "Airtel Money",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: 3,
    user: "Carol Brown",
    type: "Contact Fee",
    amount: "UGX 38,000",
    amountUSD: "$10",
    method: "MTN Mobile Money",
    status: "pending",
    date: "2024-01-15",
  },
]

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [currency, setCurrency] = useState("UGX")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your Estate Connect platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <Label>Display Currency:</Label>
            <Select defaultValue={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UGX">Uganda Shillings</SelectItem>
                <SelectItem value="USD">US Dollars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">
                      {stat.title === "Monthly Revenue"
                        ? currency === "UGX"
                          ? stat.value
                          : stat.valueUSD
                        : stat.value}
                    </p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Listings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Pending Listings
                    <Badge variant="secondary">{pendingListings.length}</Badge>
                  </CardTitle>
                  <CardDescription>Properties and plans awaiting approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingListings.map((listing) => (
                      <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{listing.title}</h4>
                          <p className="text-sm text-gray-600">by {listing.user}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={listing.type === "plan" ? "secondary" : "outline"}>{listing.type}</Badge>
                            <span className="text-sm font-medium">
                              {currency === "UGX" ? listing.price : listing.priceUSD}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest payment activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{transaction.user}</h4>
                          <p className="text-sm text-gray-600">{transaction.type}</p>
                          <p className="text-xs text-gray-500">{transaction.method}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {currency === "UGX" ? transaction.amount : transaction.amountUSD}
                          </p>
                          <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and their activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Input placeholder="Search users..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="User type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="buyers">Buyers</SelectItem>
                        <SelectItem value="sellers">Sellers</SelectItem>
                        <SelectItem value="architects">Architects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 p-4 border-b font-medium">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Type</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    {/* User rows would go here */}
                    <div className="p-8 text-center text-gray-500">
                      User management interface would be implemented here
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fee Configuration</CardTitle>
                  <CardDescription>Set listing and transaction fees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Property Sale Listing Fee (%)</Label>
                    <Input type="number" placeholder="2.5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Rental Listing Fee (UGX)</Label>
                    <Input type="number" placeholder="95000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Plan Listing Fee (UGX)</Label>
                    <Input type="number" placeholder="56000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Buyer Contact Fee (UGX)</Label>
                    <Input type="number" placeholder="19000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Plan Download Fee (UGX)</Label>
                    <Input type="number" placeholder="38000" />
                  </div>
                  <Button className="w-full">Update Fees</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Configure mobile money integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>MTN Mobile Money API Key</Label>
                    <Input type="password" placeholder="Enter API key" />
                  </div>
                  <div className="space-y-2">
                    <Label>Airtel Money API Key</Label>
                    <Input type="password" placeholder="Enter API key" />
                  </div>
                  <div className="space-y-2">
                    <Label>Transaction Callback URL</Label>
                    <Input placeholder="https://api.estateconnect.ug/callback" />
                  </div>
                  <Button className="w-full">Update Payment Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Monitor and configure security features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-medium">System Status</h3>
                        <p className="text-sm text-green-600">Secure</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <h3 className="font-medium">Suspicious Activity</h3>
                        <p className="text-sm text-yellow-600">3 alerts</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                        <h3 className="font-medium">Active Sessions</h3>
                        <p className="text-sm text-teal-600">247 users</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Security Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Enable 2FA for Admin</Label>
                        <Select defaultValue="enabled">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enabled">Enabled</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Auto-watermark Plans</Label>
                        <Select defaultValue="enabled">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enabled">Enabled</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Support System</CardTitle>
                <CardDescription>Manage user inquiries and support tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Recent Support Tickets</h3>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Ticket
                    </Button>
                  </div>

                  <div className="border rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium">
                      <div>User</div>
                      <div>Subject</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="p-8 text-center text-gray-500">
                      Support ticket interface would be implemented here
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform Name</Label>
                    <Input defaultValue="Estate Connect" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input defaultValue="info@estateconnect.ug" />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Phone</Label>
                    <Input defaultValue="+256 700 123 456" />
                  </div>
                  <div className="space-y-2">
                    <Label>Listing Expiration (days)</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select defaultValue="UGX">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UGX">Uganda Shillings (UGX)</SelectItem>
                        <SelectItem value="USD">US Dollars (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Categories</CardTitle>
                  <CardDescription>Manage property categories and types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Land</span>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Houses for Sale</span>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Houses for Rent</span>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Condominiums</span>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Infrastructure Plans</span>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
