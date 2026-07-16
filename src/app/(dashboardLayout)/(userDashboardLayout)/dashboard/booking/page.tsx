"use client";

import { useState } from "react";
import {
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
} from "@/redux/features/booking/booking.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BOOKING_STATUS,
  IBooking,
} from "@/redux/features/booking/booking.interface";

const statusVariant: Record<
  BOOKING_STATUS,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [BOOKING_STATUS.PENDING]: "outline",
  [BOOKING_STATUS.COMPLETE]: "default",
  [BOOKING_STATUS.FAILED]: "destructive",
  [BOOKING_STATUS.CANCEL]: "secondary",
};

export default function Booking() {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );

  const { data, isLoading, isError } = useGetAllBookingsQuery(undefined);
  const bookings = (data?.data ?? []) as IBooking[];

  const { data: singleBookingData, isLoading: isSingleLoading } =
    useGetSingleBookingQuery(selectedBookingId as string, {
      skip: !selectedBookingId,
    });

  const booking = singleBookingData?.data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tour</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && isError && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-red-500 py-8"
                >
                  Failed to load bookings.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              bookings.map((b) => (
                <TableRow
                  key={b._id}
                  onClick={() => setSelectedBookingId(b._id)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    {b.tour?.title ?? "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{b.user?.name ?? "—"}</span>
                      <span className="text-xs text-muted-foreground">
                        {b.user?.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{b.guestCount}</TableCell>
                  <TableCell>
                    {b.totalAmount ? `$${b.totalAmount}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(b.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Left-side detail sheet */}
      <Sheet
        open={!!selectedBookingId}
        onOpenChange={(open) => {
          if (!open) setSelectedBookingId(null);
        }}
      >
        <SheetContent
          side="left"
          className="w-full sm:max-w-md overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Booking details</SheetTitle>
            <SheetDescription>
              Full information for this booking.
            </SheetDescription>
          </SheetHeader>

          {isSingleLoading && (
            <div className="space-y-3 px-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          )}

          {!isSingleLoading && booking && (
            <div className="px-4 space-y-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Tour</p>
                <p className="font-medium">{booking.tour?.title ?? "—"}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Guest</p>
                <p className="font-medium">{booking.user?.name ?? "—"}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.user?.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Guests</p>
                  <p className="font-medium">{booking.guestCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-medium">
                    {booking.totalAmount ? `$${booking.totalAmount}` : "—"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge variant={statusVariant[booking.status]}>
                  {booking.status}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Booked on</p>
                <p className="font-medium">
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Booking ID</p>
                <p className="font-mono text-xs break-all">{booking._id}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
