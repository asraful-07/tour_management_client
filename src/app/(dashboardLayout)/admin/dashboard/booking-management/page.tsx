/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Package,
  Loader2,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Download,
  Printer,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/booking.api";
import { BOOKING_STATUS } from "@/redux/features/booking/booking.interface";

// Types
interface BookingData {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  tour: {
    _id: string;
    title: string;
    images: string[];
    costFrom: number;
    location: string;
  };
  guestCount: number;
  status: "PENDING" | "COMPLETE" | "FAILED" | "CANCEL";
  payment: {
    _id: string;
    amount: number;
    status: "PENDING" | "PAID" | "FAILED";
    transactionId?: string;
    invoiceUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function BookingManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterPayment, setFilterPayment] = useState<string>("ALL");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState<string>("");
  const [bookingToUpdate, setBookingToUpdate] = useState<string>("");

  // API Hooks
  const { data, isLoading, isError, error, refetch } = useGetAllBookingsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm || undefined,
    status: filterStatus !== "ALL" ? filterStatus : undefined,
    paymentStatus: filterPayment !== "ALL" ? filterPayment : undefined,
  });

  const { data: singleBookingData, isLoading: isSingleLoading } =
    useGetSingleBookingQuery(selectedBookingId || "", {
      skip: !selectedBookingId,
    });

  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  // Get bookings data
  const bookings: any = data?.data || [];
  const totalBookings = data?.meta?.total || bookings.length;
  const totalPages = Math.ceil(totalBookings / itemsPerPage);

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

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "TBD";
      return format(date, "MMM dd, yyyy • hh:mm a");
    } catch {
      return "TBD";
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        variant: "default" | "destructive" | "outline" | "secondary" | "ghost";
        label: string;
      }
    > = {
      COMPLETE: { variant: "ghost", label: "Complete" },
      PENDING: { variant: "secondary", label: "Pending" },
      FAILED: { variant: "destructive", label: "Failed" },
      CANCEL: { variant: "destructive", label: "Cancelled" },
    };
    return statusMap[status] || { variant: "secondary", label: status };
  };

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        variant: "default" | "destructive" | "outline" | "secondary" | "ghost";
        label: string;
      }
    > = {
      PAID: { variant: "ghost", label: "Paid" },
      PENDING: { variant: "secondary", label: "Pending" },
      FAILED: { variant: "destructive", label: "Failed" },
    };
    return statusMap[status] || { variant: "secondary", label: status };
  };

  // Handle view booking
  const handleViewBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsDrawerOpen(true);
  };

  // Handle delete booking
  const handleDeleteBooking = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!bookingToDelete) return;
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Booking deleted successfully! 🗑️");
      setIsDeleteDialogOpen(false);
      setBookingToDelete(null);
      setIsSubmitting(false);
      refetch();
    }, 1000);
  };

  // Handle status update
  const handleUpdateStatus = (bookingId: string, status: string) => {
    setBookingToUpdate(bookingId);
    setStatusToUpdate(status);
    setIsStatusDialogOpen(true);
  };

  const confirmStatusUpdate = async () => {
    if (!bookingToUpdate || !statusToUpdate) return;

    setIsSubmitting(true);
    try {
      const result = await updateBookingStatus({
        bookingId: bookingToUpdate,
        statusData: { status: statusToUpdate },
      }).unwrap();

      if (result.success) {
        toast.success(`Booking status updated to ${statusToUpdate}! ✅`);
        setIsStatusDialogOpen(false);
        setBookingToUpdate("");
        setStatusToUpdate("");
        refetch();
      } else {
        toast.error("Failed to update booking status");
      }
    } catch (err: any) {
      console.error("Status update error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate stats from real data
  const totalRevenue = bookings.reduce(
    (sum: number, b: BookingData) => sum + (b.payment?.amount || 0),
    0,
  );
  const completedBookings = bookings.filter(
    (b: BookingData) => b.status === BOOKING_STATUS.COMPLETE,
  ).length;
  const pendingBookings = bookings.filter(
    (b: BookingData) => b.status === BOOKING_STATUS.PENDING,
  ).length;
  const failedBookings = bookings.filter(
    (b: BookingData) => b.status === BOOKING_STATUS.FAILED,
  ).length;

  // Status options for dropdown
  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "COMPLETE", label: "Complete" },
    { value: "FAILED", label: "Failed" },
    { value: "CANCEL", label: "Cancelled" },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading bookings...
          </p>
        </div>
      </div>
    );
  }

  // Error state
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
              {error && typeof error === "object" && "message" in error
                ? String(error.message)
                : "Failed to load bookings. Please try again."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="bg-orange-500 hover:bg-orange-600 w-full"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get selected booking data
  const selectedBooking = singleBookingData?.data as BookingData | undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Booking Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all bookings, track payments, and update statuses
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-orange-200 hover:bg-orange-50"
              onClick={() => refetch()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              className="border-orange-200 hover:bg-orange-50"
              onClick={() => toast.success("Exporting bookings...")}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
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
                  <p className="text-xs text-muted-foreground">
                    Total Bookings
                  </p>
                  <p className="text-xl font-bold text-slate-800">
                    {totalBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold text-green-600">
                    ৳{totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-xl font-bold text-blue-600">
                    {completedBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {pendingBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No Bookings Found
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm ||
                  filterStatus !== "ALL" ||
                  filterPayment !== "ALL"
                    ? "Try adjusting your filters"
                    : "Start managing bookings!"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50">
                    <TableRow>
                      <TableHead className="font-semibold">Booking</TableHead>
                      <TableHead className="font-semibold">User</TableHead>
                      <TableHead className="font-semibold">Tour</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Payment</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="text-center font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking: any) => {
                      const statusBadge = getStatusBadge(booking.status);
                      const paymentBadge = getPaymentStatusBadge(
                        booking.payment?.status || "PENDING",
                      );
                      const isPaid = booking.payment?.status === "PAID";

                      return (
                        <TableRow
                          key={booking._id}
                          className="hover:bg-orange-50/50 transition-colors duration-150"
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium text-slate-800 text-sm">
                                #{booking._id.slice(0, 8)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking.guestCount} guest
                                {booking.guestCount > 1 ? "s" : ""}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div>
                              <p className="font-medium text-slate-800">
                                {booking.user?.name || "N/A"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking.user?.email || "N/A"}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={
                                    booking.tour?.images?.[0] ||
                                    "/placeholder-image.jpg"
                                  }
                                  alt={booking.tour?.title || "Tour"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-slate-800 line-clamp-1 text-sm">
                                  {booking.tour?.title || "Unknown Tour"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {booking.tour?.location || "N/A"}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-orange-500" />
                              <span className="font-semibold text-slate-800">
                                ৳
                                {booking.payment?.amount?.toLocaleString() ||
                                  "0"}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <Badge variant={statusBadge.variant}>
                              {statusBadge.label}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <Badge variant={paymentBadge.variant}>
                              {paymentBadge.label}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                              {formatDate(booking.createdAt)}
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center justify-center gap-1.5">
                              <Button
                                onClick={() => handleViewBooking(booking._id)}
                                variant="outline"
                                className="border-orange-200 hover:bg-orange-50 text-xs px-2 py-1.5 h-auto rounded-lg"
                                size="sm"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              <Select
                                value={booking.status}
                                onValueChange={(value) =>
                                  handleUpdateStatus(booking._id, value)
                                }
                              >
                                <SelectTrigger className="w-[100px] h-8 text-xs border-orange-200">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  {statusOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                onClick={() => handleDeleteBooking(booking._id)}
                                variant="outline"
                                className="border-red-200 hover:bg-red-50 text-xs px-2 py-1.5 h-auto rounded-lg"
                                size="sm"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {bookings.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-orange-100">
                <p className="text-sm text-muted-foreground">
                  Showing {bookings.length} of {totalBookings} bookings
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

        {/* Booking Details Drawer */}
        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          swipeDirection="right"
        >
          <DrawerContent className="h-full max-w-[500px] right-0 left-auto rounded-none">
            <div className="flex flex-col h-full">
              <DrawerHeader className="border-b border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <DrawerTitle className="text-2xl font-bold text-slate-800">
                      Booking Details
                    </DrawerTitle>
                    <DrawerDescription>
                      Complete information about this booking
                    </DrawerDescription>
                  </div>
                  <DrawerClose>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-orange-50 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto p-6">
                {isSingleLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                  </div>
                ) : selectedBooking ? (
                  <div className="space-y-6">
                    {/* User Info */}
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {selectedBooking.user?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {selectedBooking.user?.name || "N/A"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{selectedBooking.user?.email || "N/A"}</span>
                        </div>
                        {selectedBooking.user?.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{selectedBooking.user.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tour Info */}
                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={
                            selectedBooking.tour?.images?.[0] ||
                            "/placeholder-image.jpg"
                          }
                          alt={selectedBooking.tour?.title || "Tour"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {selectedBooking.tour?.title || "Unknown Tour"}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{selectedBooking.tour?.location || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-orange-500">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>
                            ৳{selectedBooking.tour?.costFrom || 0}/person
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Booking ID
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Guest Count
                        </p>
                        <p className="font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4 text-orange-500" />
                          {selectedBooking.guestCount}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Total Amount
                        </p>
                        <p className="font-semibold text-orange-500 text-lg">
                          ৳
                          {selectedBooking.payment?.amount?.toLocaleString() ||
                            "0"}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Booking Status
                        </p>
                        <Badge
                          variant={
                            getStatusBadge(selectedBooking.status).variant
                          }
                        >
                          {getStatusBadge(selectedBooking.status).label}
                        </Badge>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Payment Status
                        </p>
                        <Badge
                          variant={
                            getPaymentStatusBadge(
                              selectedBooking.payment?.status || "PENDING",
                            ).variant
                          }
                        >
                          {
                            getPaymentStatusBadge(
                              selectedBooking.payment?.status || "PENDING",
                            ).label
                          }
                        </Badge>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Transaction ID
                        </p>
                        <p className="font-mono text-sm">
                          {selectedBooking.payment?.transactionId || "N/A"}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg col-span-2">
                        <p className="text-xs text-muted-foreground">
                          Booked On
                        </p>
                        <p className="font-medium">
                          {formatDateTime(selectedBooking.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      {selectedBooking.payment?.status !== "PAID" && (
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Process Payment
                        </Button>
                      )}
                      {selectedBooking.payment?.invoiceUrl && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            window.open(
                              selectedBooking.payment.invoiceUrl,
                              "_blank",
                            );
                            toast.success("Downloading invoice...");
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No booking data found
                    </p>
                  </div>
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
                Delete Booking
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this booking? This action cannot
                be undone.
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
                    Delete Booking
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Status Update Confirmation Dialog */}
        <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-blue-600">
                <Edit className="w-5 h-5" />
                Update Booking Status
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to update this booking status to{" "}
                <strong>{statusToUpdate}</strong>?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsStatusDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={confirmStatusUpdate}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Update Status
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
