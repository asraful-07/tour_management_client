/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api";
import Image from "next/image";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Eye,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Download,
  Printer,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  BOOKING_STATUS,
  IBooking,
} from "@/redux/features/booking/booking.interface";

export default function Booking() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, isError, error } = useGetMyBookingsQuery();

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

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        variant:
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "success";
        label: string;
      }
    > = {
      COMPLETE: { variant: "success", label: "Complete" },
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
        variant:
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "success";
        label: string;
      }
    > = {
      PAID: { variant: "success", label: "Paid" },
      PENDING: { variant: "secondary", label: "Pending" },
      FAILED: { variant: "destructive", label: "Failed" },
    };
    return statusMap[status] || { variant: "secondary", label: status };
  };

  // Filter and search data
  const bookings: any = data?.data || [];
  const filteredBookings = bookings.filter((booking: any) => {
    const matchesSearch =
      booking.tour?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // Handle actions
  const handlePayment = (bookingId: string) => {
    toast.info(`Processing payment for booking: ${bookingId}`);
    // Add your payment logic here
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const handleDownloadInvoice = (invoiceUrl: string) => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank");
    } else {
      toast.error("No invoice available");
    }
  };

  // Calculate stats
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(
    (b: any) => b.status === BOOKING_STATUS.COMPLETE,
  ).length;
  const pendingBookings = bookings.filter(
    (b: any) => b.status === BOOKING_STATUS.PENDING,
  ).length;
  const totalSpent = bookings.reduce(
    (sum: number, b: any) => sum + (b.payment?.amount || 0),
    0,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading your bookings...
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
              {error && typeof error === "object" && "message" in error
                ? String(error.message)
                : "Failed to load bookings. Please try again."}
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
              My Bookings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all your tour bookings in one place
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-orange-200 hover:bg-orange-50"
              onClick={() => toast.info("Printing...")}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              variant="outline"
              className="border-orange-200 hover:bg-orange-50"
              onClick={() => toast.info("Downloading...")}
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
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold text-slate-800">
                {totalBookings}
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {completedBookings}
              </p>
            </CardContent>
          </Card>
          <Card className="border-yellow-100">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pendingBookings}
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold text-blue-600">
                ৳{totalSpent.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {currentBookings.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No Bookings Found
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "ALL"
                    ? "Try adjusting your filters"
                    : "Start booking your next adventure!"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50">
                    <TableRow>
                      <TableHead className="font-semibold">Tour</TableHead>
                      <TableHead className="font-semibold">
                        Booking costFrom
                      </TableHead>
                      <TableHead className="font-semibold">Guests</TableHead>
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
                    {currentBookings.map((booking: any) => {
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
                          {/* Tour */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={
                                    booking.tour?.images?.[0] ||
                                    "/placeholder-image.jpg"
                                  }
                                  alt={booking.tour?.title || "Tour"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-slate-800 line-clamp-1">
                                  {booking.tour?.title || "Unknown Tour"}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Booking ID */}
                          <TableCell>
                            <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                              #{booking.costFrom}
                            </code>
                          </TableCell>

                          {/* Guests */}
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">
                                {booking.guestCount}
                              </span>
                            </div>
                          </TableCell>

                          {/* Amount */}
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

                          {/* Status */}
                          <TableCell>
                            <Badge variant={statusBadge.variant as any}>
                              {statusBadge.label}
                            </Badge>
                          </TableCell>

                          {/* Payment Status */}
                          <TableCell>
                            <Badge variant={paymentBadge.variant as any}>
                              {paymentBadge.label}
                            </Badge>
                          </TableCell>

                          {/* Date */}
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                              {formatDate(booking.createdAt)}
                            </div>
                          </TableCell>

                          {/* Actions */}
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              {!isPaid &&
                                booking.status !== BOOKING_STATUS.CANCEL &&
                                booking.status !== BOOKING_STATUS.FAILED && (
                                  <Button
                                    onClick={() => handlePayment(booking._id)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 h-auto rounded-lg"
                                    size="sm"
                                  >
                                    <CreditCard className="w-3.5 h-3.5 mr-1" />
                                    Pay
                                  </Button>
                                )}
                              <Button
                                onClick={() => handleViewDetails(booking)}
                                variant="outline"
                                className="border-orange-200 hover:bg-orange-50 text-xs px-3 py-1.5 h-auto rounded-lg"
                                size="sm"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              {booking.payment?.invoiceUrl && (
                                <Button
                                  onClick={() =>
                                    handleDownloadInvoice(
                                      booking.payment.invoiceUrl!,
                                    )
                                  }
                                  variant="outline"
                                  className="border-orange-200 hover:bg-orange-50 text-xs px-3 py-1.5 h-auto rounded-lg"
                                  size="sm"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </Button>
                              )}
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
            {currentBookings.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-orange-100">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredBookings.length)} of{" "}
                  {filteredBookings.length} bookings
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

        {/* Booking Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Complete information about your booking
              </DialogDescription>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-6">
                {/* Tour Info */}
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        selectedBooking.tour?.images?.[0] ||
                        "/placeholder-image.jpg"
                      }
                      alt={selectedBooking.tour?.title || "Tour"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedBooking.tour?.title}
                    </h3>
                    {/* <p className="text-sm text-muted-foreground">
                      Booking ID: #{selectedBooking._id}
                    </p> */}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Guest Count</p>
                    <p className="font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {selectedBooking.guestCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Amount
                    </p>
                    <p className="font-medium text-orange-500">
                      ৳
                      {selectedBooking.payment?.amount?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Booking Status
                    </p>
                    <Badge
                      variant={
                        getStatusBadge(selectedBooking.status).variant as any
                      }
                    >
                      {getStatusBadge(selectedBooking.status).label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Status
                    </p>
                    <Badge
                      variant={
                        getPaymentStatusBadge(
                          selectedBooking.payment?.status || "PENDING",
                        ).variant as any
                      }
                    >
                      {
                        getPaymentStatusBadge(
                          selectedBooking.payment?.status || "PENDING",
                        ).label
                      }
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Transaction ID
                    </p>
                    <p className="font-mono text-sm">
                      {selectedBooking.payment?.transactionId || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Booked On</p>
                    <p className="font-medium">
                      {formatDateTime(selectedBooking.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  {selectedBooking.payment?.status !== "PAID" &&
                    selectedBooking.status !== BOOKING_STATUS.CANCEL &&
                    selectedBooking.status !== BOOKING_STATUS.FAILED && (
                      <Button
                        onClick={() => handlePayment(selectedBooking._id)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                  {selectedBooking.payment?.invoiceUrl && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleDownloadInvoice(
                          selectedBooking.payment.invoiceUrl!,
                        )
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Invoice
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
