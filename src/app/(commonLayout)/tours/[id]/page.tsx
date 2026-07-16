/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import {
  Calendar,
  Check,
  MapPin,
  Minus,
  Plus,
  PlaneLanding,
  PlaneTakeoff,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function TourDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const slug = params?.id;

  const [guestCount, setGuestCount] = useState(1);

  const { data: tourData, isLoading } = useGetSingleTourQuery(slug ?? "", {
    skip: !slug,
  });

  const { data: divisionData } = useGetDivisionsQuery(
    { _id: tourData?.data?.division, fields: "name" },
    { skip: !tourData?.data?.division },
  );

  const images = (tourData?.data?.images ?? []).filter(
    (img: any): img is string => Boolean(img),
  );
  const amenities = (tourData?.data?.amenities ?? []).filter(
    (item: any): item is string => Boolean(item),
  );
  const included = (tourData?.data?.included ?? []).filter(
    (item: any): item is string => Boolean(item),
  );
  const excluded = (tourData?.data?.excluded ?? []).filter(
    (item: any): item is string => Boolean(item),
  );
  const tourPlan = (tourData?.data?.tourPlan ?? []).filter(
    (item: any): item is string => typeof item === "string",
  );

  const maxGuest = tourData?.maxGuest ?? 1;

  const handleIncreaseGuest = () => {
    setGuestCount((prev) => Math.min(prev + 1, maxGuest));
  };

  const handleDecreaseGuest = () => {
    setGuestCount((prev) => Math.max(prev - 1, 1));
  };

  const handleBookNow = () => {
    router.push(`/bookings?tourId=${tourData?._id}&guestCount=${guestCount}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-5 py-24 flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-muted-foreground animate-pulse">
          Loading tour...
        </p>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="container mx-auto px-5 py-24 flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">Tour not found.</p>
      </div>
    );
  }

  const coverImage = images[0] ?? "/placeholder-image.jpg";
  const galleryImages = images.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={coverImage}
          alt={tourData.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-5 pb-8">
          <span className="inline-flex items-center gap-1.5 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium mb-3">
            <MapPin className="w-3.5 h-3.5" />
            {tourData.location}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 max-w-3xl">
            {tourData.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-white/90 text-sm">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Max {tourData.maxGuest} guests
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {tourData.startDate &&
                format(new Date(tourData.startDate), "PP")}{" "}
              - {tourData.endDate && format(new Date(tourData.endDate), "PP")}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {tourData.description}
            </p>
          </section>

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {galleryImages.map((image: any, index: any) => (
                  <div
                    key={index}
                    className="relative w-full h-32 md:h-36 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${tourData.title} ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Route info */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded-xl p-4 flex items-start gap-3">
              <PlaneTakeoff className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Departure</p>
                <p className="font-medium">{tourData.departureLocation}</p>
              </div>
            </div>
            <div className="border rounded-xl p-4 flex items-start gap-3">
              <PlaneLanding className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Arrival</p>
                <p className="font-medium">{tourData.arrivalLocation}</p>
              </div>
            </div>
          </section>

          {/* Included / Excluded */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Included</h3>
              <ul className="space-y-2">
                {included.map((item: any, index: any) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Excluded</h3>
              <ul className="space-y-2">
                {excluded.map((item: any, index: any) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Amenities */}
          {amenities.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity: any, index: any) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-muted/60 text-sm rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Tour Plan */}
          {tourPlan.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4">Itinerary</h3>
              <ol className="space-y-4 border-l-2 border-primary/20 pl-5">
                {tourPlan.map((plan: any, index: any) => (
                  <li key={index} className="relative">
                    <span className="absolute -left-[27px] bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <p className="text-sm text-muted-foreground pt-0.5">
                      {plan}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        {/* Right: booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-3xl font-bold text-primary">
                ৳{Number(tourData.costFrom ?? 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">per person</p>
            </div>

            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Division</span>
                <span className="font-medium">
                  {divisionData?.[0]?.name ?? "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min Age</span>
                <span className="font-medium">{tourData.minAge}+ years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max Guests</span>
                <span className="font-medium">{tourData.maxGuest}</span>
              </div>
            </div>

            {/* Guest Count Selector */}
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-sm text-muted-foreground">
                Number of Guests
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDecreaseGuest}
                  disabled={guestCount <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-medium">
                  {guestCount}
                </span>
                <button
                  type="button"
                  onClick={handleIncreaseGuest}
                  disabled={guestCount >= maxGuest}
                  className="w-8 h-8 flex items-center justify-center rounded-full border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button className="w-full h-11 text-base" onClick={handleBookNow}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
