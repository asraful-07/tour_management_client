"use client";

import { Button } from "@/components/ui/button";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

interface TourData {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  tourType: string;
  maxGuest: number;
  costFrom: number;
  images: string[];
  included: string[];
  tourPlan: string[];
}

interface BookingResponse {
  success: boolean;
  data: {
    paymentUrl: string;
  };
}

export default function BookingPage() {
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isBooking, setIsBooking] = useState<boolean>(false);

  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError } = useGetAllToursQuery({ _id: id });
  const [createBooking] = useCreateBookingMutation();

  const tourData = data?.data?.[0] as TourData | undefined;

  const totalAmount = useMemo(() => {
    if (!isLoading && !isError && tourData) {
      return guestCount * tourData.costFrom;
    }
    return 0;
  }, [guestCount, isLoading, isError, tourData]);

  const incrementGuest = (): void => {
    setGuestCount((prev) => prev + 1);
  };

  const decrementGuest = (): void => {
    setGuestCount((prev) => prev - 1);
  };

  const handleBooking = async (): Promise<void> => {
    if (!id || isBooking) return;

    // Open the window SYNCHRONOUSLY, right on click — before any await.
    // This keeps it tied to the user gesture so browsers don't block it.
    const paymentWindow = window.open("", "_blank");

    setIsBooking(true);
    const toastId = toast.loading("Creating your booking...");

    const bookingData = {
      tour: id,
      guestCount: guestCount,
    };

    try {
      const res = (await createBooking(
        bookingData,
      ).unwrap()) as BookingResponse;

      if (res.success && res.data?.paymentUrl) {
        toast.success("Booking created! Redirecting to payment...", {
          id: toastId,
        });
        if (paymentWindow) {
          paymentWindow.location.href = res.data.paymentUrl;
        } else {
          // Popup was blocked despite the sync open (rare, e.g. strict browser settings)
          // fall back to redirecting the current tab
          window.location.href = res.data.paymentUrl;
        }
      } else {
        paymentWindow?.close();
        toast.error("Booking failed. Please try again.", { id: toastId });
      }
    } catch (err) {
      console.error("Booking error:", err);
      paymentWindow?.close();
      toast.error("Something went wrong while creating your booking.", {
        id: toastId,
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto">
      {!isLoading && isError && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 text-lg">Something Went Wrong!!</p>
        </div>
      )}

      {!isLoading && !isError && data?.data?.length === 0 && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg">No Data Found</p>
        </div>
      )}

      {!isLoading &&
        !isError &&
        data?.data &&
        data?.data?.length > 0 &&
        tourData && (
          <>
            {/* Left Section - Tour Summary */}
            <div className="flex-1 space-y-6">
              <div className="relative w-full h-64">
                <Image
                  src={tourData.images[0]}
                  alt={tourData.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-2">{tourData.title}</h1>
                <p className="text-gray-600 mb-4">{tourData.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Location:</strong> {tourData.location}
                  </div>
                  <div>
                    <strong>Duration:</strong> {tourData.startDate} to{" "}
                    {tourData.endDate}
                  </div>
                  <div>
                    <strong>Tour Type:</strong> {tourData.location}
                  </div>
                  <div>
                    <strong>Max Guests:</strong> {tourData.maxGuest}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What&apos;s Included
                </h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {tourData.included.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Tour Plan</h3>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  {tourData.tourPlan.map((plan: string, index: number) => (
                    <li key={index}>{plan}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right Section - Booking Details */}
            <div className="w-full md:w-96">
              <div className="border border-muted p-6 rounded-lg shadow-md sticky top-6">
                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Number of Guests
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={decrementGuest}
                        disabled={guestCount <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease guest count"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-8 text-center">
                        {guestCount}
                      </span>
                      <button
                        onClick={incrementGuest}
                        disabled={guestCount >= tourData.maxGuest}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 hover:bg-gray-100 transition-colors"
                        aria-label="Increase guest count"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum {tourData.maxGuest} guests allowed
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Price per person:</span>
                      <span>${tourData.costFrom}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Guests:</span>
                      <span>{guestCount}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span>${totalAmount}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleBooking}
                    className="w-full"
                    size="lg"
                    disabled={isBooking}
                  >
                    {isBooking ? "Processing..." : "Book Now"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
}
