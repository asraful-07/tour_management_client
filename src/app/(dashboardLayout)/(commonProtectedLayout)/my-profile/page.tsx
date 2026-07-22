"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Award,
  Clock,
  Settings,
  Edit,
  LogOut,
  Shield,
  CheckCircle,
  Camera,
  Heart,
  Star,
  TrendingUp,
  Ticket,
  CalendarDays,
  Globe,
  Link as LinkIcon,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const COVER_IMAGE =
  "https://images.unsplash.com/photo-1607159552294-8112236e26b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8";

interface AuthProvider {
  provider: string;
  providerId: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  address?: string;
  auths?: AuthProvider[];
  bio?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
  stats?: {
    totalBookings: number;
    completedTrips: number;
    totalSpent: number;
    reviews: number;
    rating: number;
  };
}

export default function Profile() {
  const router = useRouter();
  const { data, isLoading, isError } = useUserInfoQuery("HELLO");
  const [isEditing, setIsEditing] = useState(false);

  const userData: UserData = data?.data;

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "TBD";
      return format(date, "MMM dd, yyyy");
    } catch {
      return "TBD";
    }
  };

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    toast.info("Logging out...");
    // Add your logout logic here
    router.push("/login");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    toast.info("Edit profile mode activated");
    // Add your edit logic here
  };

  const handleChangePhoto = () => {
    toast.info("Change profile photo");
    // Add your photo upload logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="w-6 h-6" />
              Something went wrong!
            </CardTitle>
            <CardDescription>
              Failed to load profile. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="bg-orange-500 hover:bg-orange-600 w-full"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image with Unsplash */}
          <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden">
            <Image
              src={COVER_IMAGE}
              alt="Profile Cover"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  My Profile
                </h1>
                <p className="text-white/80 mt-1 text-sm md:text-base">
                  Manage your account and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Profile Picture - Clean design without extra badges */}
          <div className="relative -mt-16 md:-mt-20 px-4">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
              <div className="relative group">
                <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-xl ring-4 ring-orange-500/20">
                  <AvatarImage
                    src={userData.profileImage || "/placeholder-avatar.jpg"}
                    alt={userData.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-3xl font-bold">
                    {getInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleChangePhoto}
                  className="absolute bottom-0 right-0 p-1.5 bg-orange-500 rounded-full border-2 border-white hover:bg-orange-600 transition-all shadow-lg"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                    {userData.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground justify-center md:justify-start">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                {userData.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground justify-center md:justify-start">
                    <Phone className="w-4 h-4" />
                    <span>{userData.phone}</span>
                  </div>
                )}
                {userData.bio && (
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    {userData.bio}
                  </p>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={handleEditProfile}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                {/* <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - with actual data from your JSON */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="border-orange-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Ticket className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total Bookings
                  </p>
                  <p className="text-xl font-bold text-slate-800">
                    {userData.stats?.totalBookings || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Completed Trips
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {userData.stats?.completedTrips || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-xl font-bold text-blue-600">
                    ৳{userData.stats?.totalSpent?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Star className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reviews</p>
                  <p className="text-xl font-bold text-purple-600">
                    {userData.stats?.reviews || 0} (
                    {userData.stats?.rating || 0}★)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your personal details and account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-slate-800">
                      {userData.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email Address
                    </p>
                    <p className="font-medium text-slate-800">
                      {userData.email}
                    </p>
                  </div>
                  {userData.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Phone Number
                      </p>
                      <p className="font-medium text-slate-800">
                        {userData.phone}
                      </p>
                    </div>
                  )}
                  {userData.address && (
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-slate-800">
                        {userData.address}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Member Since
                    </p>
                    <p className="font-medium text-slate-800">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account Status
                    </p>
                    <Badge className="bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {userData.isActive || "Active"}
                    </Badge>
                  </div>
                </div>

                {/* Auth Providers */}
                {userData.auths && userData.auths.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Authentication Methods
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {userData.auths.map((auth, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-blue-50"
                        >
                          {auth.provider}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {userData.bio && (
                  <div>
                    <p className="text-sm text-muted-foreground">Bio</p>
                    <p className="text-slate-700">{userData.bio}</p>
                  </div>
                )}

                {userData.website && (
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a
                      href={userData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline"
                    >
                      {userData.website}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-orange-500" />
                  Preferences
                </CardTitle>
                <CardDescription>
                  Your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-medium text-slate-800">
                      {userData.preferences?.language || "English"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Notifications
                    </p>
                    <Badge
                      variant={
                        userData.preferences?.notifications
                          ? "default"
                          : "secondary"
                      }
                    >
                      {userData.preferences?.notifications
                        ? "Enabled"
                        : "Disabled"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Newsletter</p>
                    <Badge
                      variant={
                        userData.preferences?.newsletter
                          ? "default"
                          : "secondary"
                      }
                    >
                      {userData.preferences?.newsletter
                        ? "Subscribed"
                        : "Unsubscribed"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Social */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 hover:bg-orange-50"
                  onClick={() => router.push("/bookings")}
                >
                  <CalendarDays className="w-4 h-4 mr-2" />
                  My Bookings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 hover:bg-orange-50"
                  onClick={() => router.push("/wishlist")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 hover:bg-orange-50"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  Account Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account ID</span>
                  <span className="font-mono text-xs">{userData._id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">
                    {formatDate(userData.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Role</span>
                  <Badge variant="outline" className="capitalize">
                    {userData.role || "User"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={
                      userData.isActive === "ACTIVE" ? "default" : "secondary"
                    }
                    className={
                      userData.isActive === "ACTIVE"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  >
                    {userData.isActive || "Unknown"}
                  </Badge>
                </div>
                {userData.isDeleted && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deleted</span>
                    <Badge variant="destructive">Yes</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-500" />
                  Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  {userData.isVerified ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-slate-800">
                          Email Verified
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your email has been verified
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Shield className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p className="font-medium text-slate-800">
                          Not Verified
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Please verify your email
                        </p>
                        <Button
                          variant="link"
                          className="text-orange-500 p-0 h-auto"
                          onClick={() => toast.info("Verification email sent")}
                        >
                          Resend verification
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
