/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";

const categories = [
  "All",
  "Adventure",
  "Beach",
  "Cultural",
  "Wildlife",
  "City Tour",
  "Mountain",
];

export default function RecentlyViewed() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useGetAllToursQuery({
    page: 1,
    limit: 20,
  });

  const tours = data?.data ?? [];

  const filteredTours = useMemo(() => {
    if (selectedCategory === "All") return tours;

    return tours.filter(
      (tour: any) => tour.tourType?.name === selectedCategory,
    );
  }, [selectedCategory, tours]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlaying && filteredTours.length > 3) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, filteredTours.length - 3);
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, filteredTours.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, filteredTours.length - 3);
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
    // Restart auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, filteredTours.length - 3);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
    // Restart auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Get current visible tours (3 at a time)
  const visibleTours = useMemo(() => {
    if (filteredTours.length <= 3) return filteredTours;
    const start = currentIndex;
    const end = Math.min(start + 3, filteredTours.length);
    return filteredTours.slice(start, end);
  }, [currentIndex, filteredTours]);

  if (isLoading) {
    return (
      <section className="container mx-auto px-5 py-20">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-5 py-20">
      {/* Filter Buttons */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-6 transition-all duration-300
            ${
              selectedCategory === category
                ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
                : "hover:bg-orange-500 hover:border-orange-500 hover:text-white"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        {filteredTours.length > 3 && <></>}

        {/* Cards Grid - Only show 3 at a time */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500">
          {visibleTours.map((tour: any, index: number) => (
            <Link
              key={tour._id}
              href={`/tours/${tour.slug}`}
              className={index % 2 === 1 ? "lg:mt-20" : ""}
            >
              <Card className="group relative h-[450px] overflow-hidden rounded-3xl border-0 p-0 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <img
                  src={tour.images?.[0]}
                  alt={tour.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90"> {tour.location}</p>

                    <h3 className="mt-2 line-clamp-2 text-3xl font-bold">
                      {tour.title}
                    </h3>
                  </div>

                  {/* <div className="mt-5 "> */}
                  {/* <div>
                      <p className="text-sm opacity-70">Starting From</p>

                      <h4 className="text-xl font-bold">
                        ৳ {Number(tour.costFrom).toLocaleString()}
                      </h4>
                    </div> */}

                  <Button
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-md hover:bg-orange-500"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Button>
                  {/* </div> */}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {!filteredTours.length && (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            No tours found in this category.
          </p>
        </div>
      )}
    </section>
  );
}
