"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TourFilters from "@/components/Modules/Tours/ToursFilters";
import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import type { ITourPackage } from "@/types";

const PAGE_LIMIT = 6;

export default function Tours() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;
  const minGuest = searchParams.get("minGuest") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading, error } = useGetAllToursQuery({
    division,
    tourType,
    minGuest,
    sort,
    page,
    limit: PAGE_LIMIT,
  });
  const tours = data?.data ?? [];
  const totalPage = data?.meta?.totalPage ?? 1;

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-5 py-8 flex justify-center items-center min-h-[400px]">
        <p className="text-lg">Loading tours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-5 py-8 flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-500">
          Error loading tours. Please try again.
        </p>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="container mx-auto px-5 py-8 grid grid-cols-12 gap-5">
        <TourFilters />
        <div className="col-span-9 w-full flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-500">
            No tours found matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 py-8 grid grid-cols-12 gap-5">
      <TourFilters />
      <div className="col-span-9 w-full">
        <div className="space-y-6">
          {tours.map((item: ITourPackage) => {
            const firstImage =
              item.images?.find(
                (image: string | null | undefined): image is string =>
                  typeof image === "string" && image.trim().length > 0,
              ) ?? "/placeholder-image.jpg";

            const amenities = (item.amenities ?? []).filter(
              (amenity: string | null | undefined): amenity is string =>
                typeof amenity === "string" && amenity.trim().length > 0,
            );

            const tourId = item._id;
            const tourSlug = item.slug || tourId;

            return (
              <Link
                href={`/tours/${tourSlug}`}
                key={tourId}
                className="group block border border-muted rounded-xl shadow-sm overflow-hidden bg-background transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/5 shrink-0 h-48 md:h-auto overflow-hidden">
                    <img
                      src={firstImage}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-background/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-medium shadow-sm">
                      {item.location}
                    </span>
                  </div>

                  <div className="p-6 flex-1 space-y-2">
                    <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xl font-bold text-primary">
                        From ৳{Number(item.costFrom ?? 0).toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Max {item.maxGuest} guests
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 text-sm">
                      <div>
                        <span className="font-medium">From:</span>{" "}
                        {item.departureLocation}
                      </div>
                      <div>
                        <span className="font-medium">To:</span>{" "}
                        {item.arrivalLocation}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>{" "}
                        {item.tourPlan?.length ?? 0} days
                      </div>
                      <div>
                        <span className="font-medium">Min Age:</span>{" "}
                        {item.minAge}+
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={`${amenity}-${index}`}
                          className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {amenities.length > 3 && (
                        <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                          +{amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="pt-3">
                      <span className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium px-4 py-2 transition-transform group-hover:translate-x-0.5">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(p)}
              >
                {p}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPage}
              onClick={() => goToPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
