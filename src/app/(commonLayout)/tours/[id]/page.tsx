/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
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
  Clock,
  Heart,
  Share2,
  Mail,
  Award,
  Shield,
  CreditCard,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Wifi,
  Coffee,
  Utensils,
  Bed,
  Car,
  Camera,
  Waves,
  Mountain,
  TreePine,
  Sun,
  Moon,
  Wind,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLink } from "react-icons/fa";
import { toast } from "sonner";

export default function TourDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const slug = params?.id;

  const [guestCount, setGuestCount] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const { data: tourData, isLoading } = useGetSingleTourQuery(slug ?? "", {
    skip: !slug,
  });

  const [createBooking] = useCreateBookingMutation();

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

  const maxGuest = tourData?.data?.maxGuest ?? 1;
  const rating = 4.8;
  const reviewCount = 127;

  // Helper function to safely format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "TBD";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "TBD";
      return format(date, "MMM dd");
    } catch {
      return "TBD";
    }
  };

  // Get icon for amenity
  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes("wifi") || lower.includes("internet"))
      return <Wifi className="w-4 h-4" />;
    if (lower.includes("coffee") || lower.includes("tea"))
      return <Coffee className="w-4 h-4" />;
    if (
      lower.includes("restaurant") ||
      lower.includes("food") ||
      lower.includes("meal")
    )
      return <Utensils className="w-4 h-4" />;
    if (
      lower.includes("bed") ||
      lower.includes("room") ||
      lower.includes("sleep")
    )
      return <Bed className="w-4 h-4" />;
    if (
      lower.includes("car") ||
      lower.includes("transport") ||
      lower.includes("bus")
    )
      return <Car className="w-4 h-4" />;
    if (lower.includes("camera") || lower.includes("photo"))
      return <Camera className="w-4 h-4" />;
    if (
      lower.includes("beach") ||
      lower.includes("sea") ||
      lower.includes("ocean")
    )
      return <Waves className="w-4 h-4" />;
    if (lower.includes("mountain") || lower.includes("hill"))
      return <Mountain className="w-4 h-4" />;
    if (
      lower.includes("tree") ||
      lower.includes("forest") ||
      lower.includes("garden")
    )
      return <TreePine className="w-4 h-4" />;
    if (
      lower.includes("sun") ||
      lower.includes("sunny") ||
      lower.includes("pool")
    )
      return <Sun className="w-4 h-4" />;
    if (lower.includes("moon") || lower.includes("night"))
      return <Moon className="w-4 h-4" />;
    if (lower.includes("wind") || lower.includes("air"))
      return <Wind className="w-4 h-4" />;
    if (lower.includes("star") || lower.includes("luxury"))
      return <Star className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  const handleIncreaseGuest = () => {
    setGuestCount((prev) => Math.min(prev + 1, maxGuest));
  };

  const handleDecreaseGuest = () => {
    setGuestCount((prev) => Math.max(prev - 1, 1));
  };

  const handleBookNow = async () => {
    if (!tourData?.data?._id) {
      toast.error("Tour information is missing");
      return;
    }

    setIsBooking(true);
    const toastId = toast.loading("Creating your booking...");

    const bookingData = {
      tour: tourData.data._id,
      guestCount: guestCount,
    };

    try {
      const result = await createBooking(bookingData).unwrap();

      if (result?.success && result?.data?._id) {
        toast.success("Booking created successfully!", {
          id: toastId,
        });

        // Navigate to booking details page
        router.push(`/bookings/${result.data._id}`);
      } else {
        toast.error("Booking failed. Please try again.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(
        error?.data?.message ||
          "Something went wrong while creating your booking.",
        {
          id: toastId,
        },
      );
    } finally {
      setIsBooking(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${tourData?.data?.title}!`;

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
      copy: url,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrls[platform]);
      toast.success("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank");
    }
    setShowShareMenu(false);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading your adventure...
          </p>
        </div>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-lg text-muted-foreground">Tour not found.</p>
          <Button
            onClick={() => router.back()}
            className="mt-4 bg-orange-500 hover:bg-orange-600"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const coverImage = images[0] ?? "/placeholder-image.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20">
      {/* Image Gallery Section */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[500px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
            {/* Main Image */}
            <div className="md:col-span-2 relative group">
              <Image
                src={images[currentImageIndex] || coverImage}
                alt={tourData?.data?.title}
                fill
                className="object-cover transition-all duration-300"
                priority
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_: any, index: any) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-orange-500 w-8"
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-3 md:col-span-2">
              {images.slice(0, 4).map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl cursor-pointer group"
                  onClick={() => goToImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${tourData?.data?.title} ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                  {index === 3 && images.length > 4 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        +{images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Rating */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    {tourData?.data?.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Award className="w-4 h-4" />
                    Top Rated
                  </span>
                </div>
                {/* <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
                  {tourData?.data?.title}
                </h1> */}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full border transition-all ${
                    isLiked
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "hover:bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`}
                  />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-slate-400"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-2xl p-3 z-10 min-w-[200px] border border-slate-100">
                      <div className="space-y-2">
                        <button
                          onClick={() => handleShare("facebook")}
                          className="flex items-center gap-3 w-full px-3 py-2 hover:bg-slate-50 rounded-lg transition-all text-slate-700"
                        >
                          <FaFacebook className="text-blue-600 text-xl" />
                          Facebook
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex items-center gap-3 w-full px-3 py-2 hover:bg-slate-50 rounded-lg transition-all text-slate-700"
                        >
                          <FaTwitter className="text-blue-400 text-xl" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare("whatsapp")}
                          className="flex items-center gap-3 w-full px-3 py-2 hover:bg-slate-50 rounded-lg transition-all text-slate-700"
                        >
                          <FaWhatsapp className="text-green-500 text-xl" />
                          WhatsApp
                        </button>
                        <button
                          onClick={() => handleShare("email")}
                          className="flex items-center gap-3 w-full px-3 py-2 hover:bg-slate-50 rounded-lg transition-all text-slate-700"
                        >
                          <Mail className="w-5 h-5 text-slate-400" />
                          Email
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="flex items-center gap-3 w-full px-3 py-2 hover:bg-slate-50 rounded-lg transition-all text-slate-700"
                        >
                          <FaLink className="text-slate-400 text-xl" />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-white rounded-2xl shadow-sm border border-orange-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-orange-500">
                  ⭐ {rating}
                </div>
                <p className="text-sm text-muted-foreground">
                  {reviewCount} reviews
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-700">
                  <Users className="w-6 h-6 text-orange-500" />
                  {maxGuest}
                </div>
                <p className="text-sm text-muted-foreground">Max guests</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-700">
                  <Clock className="w-6 h-6 text-orange-500" />
                  {tourPlan.length}
                </div>
                <p className="text-sm text-muted-foreground">Days tour</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-700">
                  <Calendar className="w-6 h-6 text-orange-500" />
                  {formatDate(tourData?.data?.startDate)}
                </div>
                <p className="text-sm text-muted-foreground">Start date</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-700">
                  <Calendar className="w-6 h-6 text-orange-500" />
                  {formatDate(tourData?.data?.endDate)}
                </div>
                <p className="text-sm text-muted-foreground">End date</p>
              </div>
            </div>

            {/* Description */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-orange-500" />
                {tourData?.data?.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {tourData?.data?.description}
              </p>
            </section>

            {/* Route Info */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 flex items-start gap-4 transition-all hover:shadow-md hover:border-orange-300">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <PlaneTakeoff className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Departure
                  </p>
                  <p className="text-lg font-semibold text-slate-800">
                    {tourData?.data?.departureLocation}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 flex items-start gap-4 transition-all hover:shadow-md hover:border-orange-300">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <PlaneLanding className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Arrival
                  </p>
                  <p className="text-lg font-semibold text-slate-800">
                    {tourData?.data?.arrivalLocation}
                  </p>
                </div>
              </div>
            </section>

            {/* Included / Excluded */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-600">
                  <ThumbsUp className="w-6 h-6" />
                  Included
                </h3>
                <ul className="space-y-3">
                  {included.map((item: any, index: any) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm text-slate-700"
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-600">
                  <ThumbsDown className="w-6 h-6" />
                  Excluded
                </h3>
                <ul className="space-y-3">
                  {excluded.map((item: any, index: any) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm text-slate-700"
                    >
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                        <X className="w-3.5 h-3.5 text-red-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Amenities */}
            {amenities.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-3">
                  {amenities.map((amenity: any, index: any) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/5 to-orange-500/10 text-orange-600 text-sm font-medium rounded-full border border-orange-200"
                    >
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Tour Plan */}
            {tourPlan.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-orange-500" />
                  Itinerary
                </h3>
                <div className="space-y-6">
                  {tourPlan.map((plan: any, index: any) => (
                    <div key={index} className="flex gap-4 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                          {index + 1}
                        </div>
                        {index < tourPlan.length - 1 && (
                          <div className="w-0.5 h-full bg-orange-200 flex-1 mt-2"></div>
                        )}
                      </div>
                      <div className="pt-2">
                        <p className="text-muted-foreground leading-relaxed">
                          {plan}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    Starting from
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-4xl font-bold text-orange-500">
                      ৳{Number(tourData?.data?.costFrom ?? 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      / person
                    </p>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-orange-50 rounded-xl">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Division</span>
                    <span className="font-medium text-slate-800">
                      {divisionData?.data?.[0]?.name ?? "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Min Age</span>
                    <span className="font-medium text-slate-800">
                      {tourData?.data?.minAge}+ years
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Max Guests</span>
                    <span className="font-medium text-slate-800">
                      {tourData?.data?.maxGuest}
                    </span>
                  </div>
                </div>

                {/* Guest Count Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-orange-50 p-3 rounded-xl">
                    <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      Guests
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleDecreaseGuest}
                        disabled={guestCount <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border-2 border-orange-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 transition-all"
                      >
                        <Minus className="w-3.5 h-3.5 text-orange-500" />
                      </button>
                      <span className="w-8 text-center font-bold text-lg text-slate-800">
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={handleIncreaseGuest}
                        disabled={guestCount >= maxGuest}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border-2 border-orange-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 text-orange-500" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {guestCount} guest{guestCount > 1 ? "s" : ""} • Total: ৳
                    {(
                      Number(tourData?.data?.costFrom ?? 0) * guestCount
                    ).toLocaleString()}
                  </p>
                </div>

                <Button
                  className="w-full h-14 text-base font-semibold rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all text-white"
                  onClick={handleBookNow}
                  disabled={isBooking}
                >
                  {isBooking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Now
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-orange-500" /> Secure
                    Booking
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-orange-500" /> No Hidden
                    Fees
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-orange-500" /> 24/7
                    Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
