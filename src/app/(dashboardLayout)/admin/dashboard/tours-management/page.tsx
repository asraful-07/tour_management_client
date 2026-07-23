/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Package,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  useGetAllToursQuery,
  useGetSingleTourQuery,
} from "@/redux/features/tour/tour.api";

// Types
interface TourData {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: string;
  endDate: string;
  departureLocation: string;
  arrivalLocation: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxGuest: number;
  minAge: number;
  division: {
    _id: string;
    name: string;
  };
  tourType: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  slug: string;
}

// Form Schema
const tourSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location is required"),
  costFrom: z.number().min(1, "Cost must be at least 1"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  departureLocation: z.string().min(3, "Departure location is required"),
  arrivalLocation: z.string().min(3, "Arrival location is required"),
  maxGuest: z.number().min(1, "Max guests must be at least 1"),
  minAge: z.number().min(0, "Min age must be 0 or more"),
  included: z.string().optional(),
  excluded: z.string().optional(),
  amenities: z.string().optional(),
  tourPlan: z.string().optional(),
});

type TourFormData = z.infer<typeof tourSchema>;

export default function ToursManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("ALL");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedTour, setSelectedTour] = useState<TourData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isError } = useGetAllToursQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // Get tours data
  const tours: any = data?.data || [];

  // Filter tours
  const filteredTours = tours.filter((tour: any) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision =
      filterDivision === "ALL" || tour.division?.name === filterDivision;
    const matchesType =
      filterType === "ALL" || tour.tourType?.name === filterType;
    return matchesSearch && matchesDivision && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTours = filteredTours.slice(startIndex, endIndex);

  // Form
  const form = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      costFrom: 0,
      startDate: "",
      endDate: "",
      departureLocation: "",
      arrivalLocation: "",
      maxGuest: 1,
      minAge: 0,
      included: "",
      excluded: "",
      amenities: "",
      tourPlan: "",
    },
  });

  // Handle view tour
  const handleViewTour = (tour: TourData) => {
    setSelectedTour(tour);
    setIsEditMode(false);
    setIsDrawerOpen(true);
  };

  // Handle edit tour
  const handleEditTour = (tour: TourData) => {
    setSelectedTour(tour);
    setIsEditMode(true);
    form.reset({
      title: tour.title,
      description: tour.description,
      location: tour.location,
      costFrom: tour.costFrom,
      startDate: format(new Date(tour.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(tour.endDate), "yyyy-MM-dd"),
      departureLocation: tour.departureLocation,
      arrivalLocation: tour.arrivalLocation,
      maxGuest: tour.maxGuest,
      minAge: tour.minAge,
      included: tour.included.join(", "),
      excluded: tour.excluded.join(", "),
      amenities: tour.amenities.join(", "),
      tourPlan: tour.tourPlan.join("\n"),
    });
    setIsDrawerOpen(true);
  };

  // Handle delete tour
  const handleDeleteTour = (tourId: string) => {
    setTourToDelete(tourId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!tourToDelete) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Tour deleted successfully! 🗑️");
      setIsDeleteDialogOpen(false);
      setTourToDelete(null);
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle cancel form
  const handleCancelForm = () => {
    if (form.formState.isDirty) {
      setIsCancelDialogOpen(true);
    } else {
      setIsDrawerOpen(false);
      form.reset();
    }
  };

  const confirmCancel = () => {
    setIsCancelDialogOpen(false);
    setIsDrawerOpen(false);
    form.reset();
    toast.info("Form cancelled");
  };

  // Handle form submit
  const onSubmit = (data: TourFormData) => {
    setIsSubmitting(true);

    // Prepare data
    const tourData = {
      ...data,
      included: data.included
        ? data.included.split(",").map((item) => item.trim())
        : [],
      excluded: data.excluded
        ? data.excluded.split(",").map((item) => item.trim())
        : [],
      amenities: data.amenities
        ? data.amenities.split(",").map((item) => item.trim())
        : [],
      tourPlan: data.tourPlan
        ? data.tourPlan.split("\n").filter((item) => item.trim())
        : [],
    };

    // Simulate API call
    setTimeout(() => {
      if (isEditMode) {
        toast.success("Tour updated successfully! ✨");
      } else {
        toast.success("Tour created successfully! 🎉");
      }
      setIsDrawerOpen(false);
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  };

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

  // Get status badge
  const getStatusBadge = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return <Badge className="bg-blue-500">Upcoming</Badge>;
    if (now > end) return <Badge className="bg-gray-500">Completed</Badge>;
    return <Badge className="bg-green-500">Ongoing</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading tours...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-6 h-6" />
              Something went wrong!
            </CardTitle>
            <CardDescription>
              Failed to load tours. Please try again.
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Tours Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all your tours, packages, and destinations
            </p>
          </div>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              setIsEditMode(false);
              form.reset({
                title: "",
                description: "",
                location: "",
                costFrom: 0,
                startDate: "",
                endDate: "",
                departureLocation: "",
                arrivalLocation: "",
                maxGuest: 1,
                minAge: 0,
                included: "",
                excluded: "",
                amenities: "",
                tourPlan: "",
              });
              setIsDrawerOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Tour
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Package className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Tours</p>
                  <p className="text-xl font-bold text-slate-800">
                    {tours.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Tours</p>
                  <p className="text-xl font-bold text-green-600">
                    {
                      tours.filter(
                        (t: any) =>
                          new Date(t.startDate) <= new Date() &&
                          new Date(t.endDate) >= new Date(),
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Upcoming</p>
                  <p className="text-xl font-bold text-blue-600">
                    {
                      tours.filter(
                        (t: any) => new Date(t.startDate) > new Date(),
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Globe className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Destinations</p>
                  <p className="text-xl font-bold text-purple-600">
                    {new Set(tours.map((t: any) => t.location)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by tour name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select
              value={filterDivision}
              onValueChange={(value) => {
                if (value !== null) {
                  setFilterDivision(value);
                }
              }}
            >
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Divisions</SelectItem>
                <SelectItem value="Dhaka">Dhaka</SelectItem>
                <SelectItem value="Chittagong">Chittagong</SelectItem>
                <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                <SelectItem value="Khulna">Khulna</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterType}
              onValueChange={(value) => {
                if (value !== null) {
                  setFilterType(value);
                }
              }}
            >
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="Tour Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="Beach">Beach</SelectItem>
                <SelectItem value="Mountain">Mountain</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {currentTours.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏝️</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No Tours Found
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm ||
                  filterDivision !== "ALL" ||
                  filterType !== "ALL"
                    ? "Try adjusting your filters"
                    : "Start adding tours to your collection!"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50">
                    <TableRow>
                      <TableHead className="font-semibold">Tour</TableHead>
                      <TableHead className="font-semibold">Location</TableHead>
                      <TableHead className="font-semibold">Price</TableHead>
                      <TableHead className="font-semibold">Guests</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="text-center font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTours.map((tour: any) => (
                      <TableRow
                        key={tour._id}
                        className="hover:bg-orange-50/50 transition-colors duration-150"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={
                                  tour.images?.[0] || "/placeholder-image.jpg"
                                }
                                alt={tour.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 line-clamp-1">
                                {tour.title}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-sm">{tour.location}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-orange-500" />
                            <span className="font-semibold text-slate-800">
                              ৳{tour.costFrom.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-sm">{tour.maxGuest}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          {getStatusBadge(tour.startDate, tour.endDate)}
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {tour.tourType?.name || "N/A"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              onClick={() => handleViewTour(tour)}
                              variant="outline"
                              className="border-orange-200 hover:bg-orange-50 text-xs px-2.5 py-1.5 h-auto rounded-lg"
                              size="sm"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              onClick={() => handleEditTour(tour)}
                              variant="outline"
                              className="border-blue-200 hover:bg-blue-50 text-xs px-2.5 py-1.5 h-auto rounded-lg"
                              size="sm"
                            >
                              <Edit className="w-3.5 h-3.5 text-blue-600" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteTour(tour._id)}
                              variant="outline"
                              className="border-red-200 hover:bg-red-50 text-xs px-2.5 py-1.5 h-auto rounded-lg"
                              size="sm"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {currentTours.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-orange-100">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredTours.length)} of{" "}
                  {filteredTours.length} tours
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="border-orange-200 hover:bg-orange-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={
                            currentPage === pageNum
                              ? "bg-orange-500 hover:bg-orange-600 text-white"
                              : "border-orange-200 hover:bg-orange-50"
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-1">...</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className="border-orange-200 hover:bg-orange-50"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="border-orange-200 hover:bg-orange-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tour Details / Create / Edit Drawer */}
        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          swipeDirection="right"
        >
          <DrawerContent className="h-full max-w-[600px] right-0 left-auto rounded-none">
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <DrawerHeader className="border-b border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <DrawerTitle className="text-2xl font-bold text-slate-800">
                      {isEditMode
                        ? "Edit Tour"
                        : selectedTour && !isEditMode
                          ? "Tour Details"
                          : "Create New Tour"}
                    </DrawerTitle>
                    <DrawerDescription>
                      {isEditMode
                        ? "Update the tour information"
                        : selectedTour && !isEditMode
                          ? "Complete information about this tour"
                          : "Add a new tour to your collection"}
                    </DrawerDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelForm}
                    className="hover:bg-orange-50 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </DrawerHeader>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6">
                {selectedTour && !isEditMode ? (
                  // View Mode
                  <div className="space-y-6">
                    {/* Image Gallery */}
                    <div className="grid grid-cols-3 gap-2">
                      {selectedTour.images?.slice(0, 6).map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden"
                        >
                          <img
                            src={img}
                            alt={`${selectedTour.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {index === 5 && selectedTour.images.length > 6 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                +{selectedTour.images.length - 6}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Tour Info */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {selectedTour.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {selectedTour.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className="bg-orange-500">
                          {selectedTour.tourType?.name}
                        </Badge>
                        <Badge variant="outline">
                          {selectedTour.division?.name}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">
                        Description
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedTour.description}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-semibold text-orange-500">
                          ৳{selectedTour.costFrom.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Max Guests
                        </p>
                        <p className="font-semibold text-slate-800">
                          {selectedTour.maxGuest}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Min Age</p>
                        <p className="font-semibold text-slate-800">
                          {selectedTour.minAge}+ years
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Duration
                        </p>
                        <p className="font-semibold text-slate-800">
                          {formatDate(selectedTour.startDate)} -{" "}
                          {formatDate(selectedTour.endDate)}
                        </p>
                      </div>
                    </div>

                    {/* Included */}
                    {selectedTour.included?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">
                          Included
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTour.included.map((item, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-green-50 border-green-200 text-green-700"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tour Plan */}
                    {selectedTour.tourPlan?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">
                          Tour Plan
                        </h4>
                        <div className="space-y-2">
                          {selectedTour.tourPlan.map((plan, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg"
                            >
                              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                {index + 1}
                              </span>
                              <p className="text-sm text-slate-700">{plan}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Create / Edit Form
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tour Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter tour title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter tour description"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter location"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="costFrom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (BDT)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter price"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="departureLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Departure Location</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter departure"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="arrivalLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Arrival Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter arrival" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="maxGuest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Guests</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter max guests"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="minAge"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Min Age</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter min age"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="included"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Included (comma separated)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Transport, Hotel, Meals"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Separate items with commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excluded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excluded (comma separated)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Personal expenses, Shopping"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Separate items with commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="amenities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amenities (comma separated)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. WiFi, AC, Pool"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Separate items with commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tourPlan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tour Plan (one per line)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Day 1: Arrival and check-in&#10;Day 2: City tour&#10;Day 3: Departure"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter each day on a new line
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <DrawerFooter className="px-0">
                        <Button
                          type="submit"
                          className="bg-orange-500 hover:bg-orange-600"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              {isEditMode ? "Updating..." : "Creating..."}
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              {isEditMode ? "Update Tour" : "Create Tour"}
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={handleCancelForm}
                        >
                          Cancel
                        </Button>
                      </DrawerFooter>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                Delete Tour
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this tour? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={confirmDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Tour
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="w-5 h-5" />
                Cancel Changes?
              </DialogTitle>
              <DialogDescription>
                You have unsaved changes. Are you sure you want to cancel? Your
                changes will be lost.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCancelDialogOpen(false)}
              >
                Continue Editing
              </Button>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600"
                onClick={confirmCancel}
              >
                <X className="w-4 h-4 mr-2" />
                Discard Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
