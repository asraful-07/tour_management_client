"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Ticket,
  Star,
  Clock,
  ArrowRight,
  Package,
  ShoppingBag,
  UserPlus,
  Activity,
  Zap,
  Award,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Sample data
const monthlyData = [
  { name: "Jan", bookings: 12, revenue: 12000 },
  { name: "Feb", bookings: 19, revenue: 19000 },
  { name: "Mar", bookings: 15, revenue: 15000 },
  { name: "Apr", bookings: 25, revenue: 25000 },
  { name: "May", bookings: 22, revenue: 22000 },
  { name: "Jun", bookings: 30, revenue: 30000 },
  { name: "Jul", bookings: 28, revenue: 28000 },
  { name: "Aug", bookings: 35, revenue: 35000 },
  { name: "Sep", bookings: 40, revenue: 40000 },
  { name: "Oct", bookings: 38, revenue: 38000 },
  { name: "Nov", bookings: 45, revenue: 45000 },
  { name: "Dec", bookings: 50, revenue: 50000 },
];

const tourTypeData = [
  { name: "Adventure", value: 40 },
  { name: "Cultural", value: 25 },
  { name: "Nature", value: 20 },
  { name: "Beach", value: 15 },
];

const weeklyActivity = [
  { day: "Mon", visits: 120, bookings: 8 },
  { day: "Tue", visits: 150, bookings: 12 },
  { day: "Wed", visits: 180, bookings: 15 },
  { day: "Thu", visits: 200, bookings: 18 },
  { day: "Fri", visits: 250, bookings: 25 },
  { day: "Sat", visits: 300, bookings: 30 },
  { day: "Sun", visits: 280, bookings: 28 },
];

const recentBookings = [
  {
    id: 1,
    tour: "Sajek Valley Tour",
    date: "2024-12-15",
    status: "Completed",
    amount: 5500,
    guests: 2,
  },
  {
    id: 2,
    tour: "Saint Martin Island",
    date: "2024-12-10",
    status: "Pending",
    amount: 7500,
    guests: 4,
  },
  {
    id: 3,
    tour: "Bandarban Mountain",
    date: "2024-12-05",
    status: "Completed",
    amount: 4500,
    guests: 1,
  },
  {
    id: 4,
    tour: "Cox's Bazar Beach",
    date: "2024-11-28",
    status: "Cancelled",
    amount: 3500,
    guests: 3,
  },
  {
    id: 5,
    tour: "Sundarbans Safari",
    date: "2024-11-20",
    status: "Completed",
    amount: 8500,
    guests: 2,
  },
];

const COLORS = ["#f97316", "#3b82f6", "#22c55e", "#a855f7"];

export default function UserDashboard() {
  const router = useRouter();

  // Stats data
  const stats = [
    {
      title: "Total Bookings",
      value: "156",
      change: "+12.5%",
      trend: "up",
      icon: Ticket,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Total Revenue",
      value: "৳48,500",
      change: "+18.3%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Active Bookings",
      value: "23",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Reviews",
      value: "4.8 ★",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here&apos;s what&apos;s happening with your bookings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => router.push("/bookings")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View All Bookings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            stat.trend === "up"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          vs last month
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon
                        className={`w-6 h-6 text-${stat.color.split(" ")[1]}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Revenue Overview
              </CardTitle>
              <CardDescription>Monthly revenue from bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#f97316"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f97316"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-50"
                    />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#f97316"
                      strokeWidth={2}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Booking Trends
              </CardTitle>
              <CardDescription>Monthly booking statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-50"
                    />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Bar
                      dataKey="bookings"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Tour Type Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Tour Types
              </CardTitle>
              <CardDescription>Distribution by tour category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tourTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tourTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Weekly Activity
              </CardTitle>
              <CardDescription>Daily visits and bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyActivity}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-50"
                    />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="visits"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: "#8b5cf6" }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="bookings"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={{ fill: "#f97316" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Recent Bookings
                </CardTitle>
                <CardDescription>Your latest booking activity</CardDescription>
              </div>
              <Button
                variant="outline"
                className="border-orange-200 hover:bg-orange-50"
                onClick={() => router.push("/bookings")}
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-100">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Tour Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Guests
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-orange-50 hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {booking.tour}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {booking.date}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.guests}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        ৳{booking.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${getStatusColor(booking.status)} text-white`}
                        >
                          {booking.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Premium Member</h4>
                  <p className="text-white/80 text-sm mt-1">
                    You&lsquo;re eligible for premium benefits
                  </p>
                  <Button className="mt-3 bg-white text-orange-600 hover:bg-white/90">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Special Offers</h4>
                  <p className="text-white/80 text-sm mt-1">
                    25% off on your next booking
                  </p>
                  <Button className="mt-3 bg-white text-blue-600 hover:bg-white/90">
                    Claim Offer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Refer a Friend</h4>
                  <p className="text-white/80 text-sm mt-1">
                    Get ৳500 for each referral
                  </p>
                  <Button className="mt-3 bg-white text-purple-600 hover:bg-white/90">
                    Invite Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
