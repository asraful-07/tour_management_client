/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Download,
  Printer,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  TrendingUp,
  Wallet,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { BOOKING_STATUS } from "@/redux/features/booking/booking.interface";

export default function PaymentHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>("ALL");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
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

  // Get booking status badge
  const getBookingStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        variant:
          | "link"
          | "secondary"
          | "default"
          | "destructive"
          | "outline"
          | "ghost";
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

  // Get data
  const bookings: any[] = data?.data || [];

  // Filter data
  const filteredPayments = bookings.filter((booking: any) => {
    const matchesSearch =
      booking.tour?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.payment?.transactionId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || booking.status === filterStatus;
    const matchesPaymentStatus =
      filterPaymentStatus === "ALL" ||
      booking.payment?.status === filterPaymentStatus;
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  // Calculate stats
  const totalPayments = bookings.length;
  const totalAmount = bookings.reduce(
    (sum: number, b: any) => sum + (b.payment?.amount || 0),
    0,
  );
  const completedPayments = bookings.filter(
    (b: any) => b.status === BOOKING_STATUS.COMPLETE,
  ).length;
  const pendingPayments = bookings.filter(
    (b: any) => b.status === BOOKING_STATUS.PENDING,
  ).length;
  const paidPayments = bookings.filter(
    (b: any) => b.payment?.status === "PAID",
  ).length;

  const handleViewDetails = (booking: any) => {
    setSelectedPayment(booking);
    setIsDialogOpen(true);
  };

  const handleDownloadInvoice = (invoiceUrl: string) => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank");
      toast.success("Downloading invoice...");
    } else {
      toast.info("Invoice not available for this payment");
    }
  };

  const handleRetryPayment = (bookingId: string) => {
    toast.info(`Processing payment for booking: ${bookingId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading payment history...
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
                : "Failed to load payment history. Please try again."}
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
              Payment History
            </h1>
            <p className="text-muted-foreground mt-1">
              Track all your payments and transactions
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
              onClick={() => toast.success("Downloading payment history...")}
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
                  <FileText className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total Payments
                  </p>
                  <p className="text-xl font-bold text-slate-800">
                    {totalPayments}
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
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="text-xl font-bold text-green-600">
                    ৳{totalAmount.toLocaleString()}
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
                  <p className="text-xs text-muted-foreground">Paid</p>
                  <p className="text-xl font-bold text-blue-600">
                    {paidPayments}
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
                    {pendingPayments}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by tour, booking ID or transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select
                  value={filterStatus}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setFilterStatus(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Booking Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="COMPLETE">Complete</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                    <SelectItem value="CANCEL">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterPaymentStatus}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setFilterPaymentStatus(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Payments</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {currentPayments.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💳</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No Payments Found
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm ||
                  filterStatus !== "ALL" ||
                  filterPaymentStatus !== "ALL"
                    ? "Try adjusting your filters"
                    : "Start making payments to see your history"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50">
                    <TableRow>
                      <TableHead className="font-semibold">Tour</TableHead>
                      <TableHead className="font-semibold">
                        Booking ID
                      </TableHead>
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
                    {currentPayments.map((booking: any) => {
                      const bookingStatus = getBookingStatusBadge(
                        booking.status,
                      );
                      const paymentStatus = getPaymentStatusBadge(
                        booking.payment?.status || "PENDING",
                      );
                      const isPaid = booking.payment?.status === "PAID";

                      return (
                        <TableRow
                          key={booking._id}
                          className="hover:bg-orange-50/50 transition-colors duration-150"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
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
                                <p className="font-medium text-slate-800 line-clamp-1">
                                  {booking.tour?.title || "Unknown Tour"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {booking.tour?.location || "N/A"}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                              #{booking._id.slice(0, 12)}
                            </code>
                            {booking.payment?.transactionId && (
                              <p className="text-xs text-muted-foreground mt-1">
                                TXN:{" "}
                                {booking.payment.transactionId.slice(0, 10)}...
                              </p>
                            )}
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
                            <p className="text-xs text-muted-foreground">
                              {booking.guestCount} guest
                              {booking.guestCount > 1 ? "s" : ""}
                            </p>
                          </TableCell>

                          <TableCell>
                            <Badge variant={bookingStatus.variant}>
                              {bookingStatus.label}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <Badge variant={paymentStatus.variant}>
                              {paymentStatus.label}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                              {formatDate(booking.createdAt)}
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                onClick={() => handleViewDetails(booking)}
                                variant="outline"
                                className="border-orange-200 hover:bg-orange-50 text-xs px-3 py-1.5 h-auto rounded-lg"
                                size="sm"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              {!isPaid &&
                                booking.status !== "CANCEL" &&
                                booking.status !== "FAILED" && (
                                  <Button
                                    onClick={() =>
                                      handleRetryPayment(booking._id)
                                    }
                                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 h-auto rounded-lg"
                                    size="sm"
                                  >
                                    <CreditCard className="w-3.5 h-3.5 mr-1" />
                                    Pay
                                  </Button>
                                )}
                              {booking.payment?.invoiceUrl && isPaid && (
                                <Button
                                  onClick={() =>
                                    handleDownloadInvoice(
                                      booking.payment.invoiceUrl,
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
            {currentPayments.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-orange-100">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredPayments.length)} of{" "}
                  {filteredPayments.length} payments
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

        {/* Payment Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Payment Details
              </DialogTitle>
              <DialogDescription>
                Complete information about this payment
              </DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-6">
                {/* Payment Summary */}
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold text-orange-500">
                      ৳
                      {selectedPayment.payment?.amount?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Payment Status
                    </p>
                    <Badge
                      variant={
                        getPaymentStatusBadge(
                          selectedPayment.payment?.status || "PENDING",
                        ).variant
                      }
                    >
                      {
                        getPaymentStatusBadge(
                          selectedPayment.payment?.status || "PENDING",
                        ).label
                      }
                    </Badge>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking ID</p>
                    <p className="font-medium text-slate-800">
                      #{selectedPayment._id.slice(0, 12)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tour Name</p>
                    <p className="font-medium text-slate-800">
                      {selectedPayment.tour?.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Guest Count</p>
                    <p className="font-medium text-slate-800">
                      {selectedPayment.guestCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Booking Status
                    </p>
                    <Badge
                      variant={
                        getBookingStatusBadge(selectedPayment.status).variant
                      }
                    >
                      {getBookingStatusBadge(selectedPayment.status).label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Transaction ID
                    </p>
                    <p className="font-mono text-sm text-slate-800">
                      {selectedPayment.payment?.transactionId || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Date
                    </p>
                    <p className="font-medium text-slate-800">
                      {formatDateTime(selectedPayment.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  {selectedPayment.payment?.status !== "PAID" &&
                    selectedPayment.status !== "CANCEL" &&
                    selectedPayment.status !== "FAILED" && (
                      <Button
                        onClick={() => handleRetryPayment(selectedPayment._id)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                  {selectedPayment.payment?.invoiceUrl && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleDownloadInvoice(
                          selectedPayment.payment.invoiceUrl,
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
