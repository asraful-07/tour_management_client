"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useRouter, useSearchParams } from "next/navigation";

const GUEST_OPTIONS = [
  { label: "1+ guests", value: "1" },
  { label: "2+ guests", value: "2" },
  { label: "4+ guests", value: "4" },
  { label: "6+ guests", value: "6" },
  { label: "10+ guests", value: "10" },
];

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "costFrom" },
  { label: "Price: High to Low", value: "-costFrom" },
  { label: "Newest First", value: "-createdAt" },
];

export default function TourFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDivision = searchParams.get("division");
  const selectedTourType = searchParams.get("tourType");
  const selectedGuests = searchParams.get("minGuest");
  const selectedSort = searchParams.get("sort");

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    }),
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    }),
  );

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    params.delete("minGuest");
    params.delete("sort");
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const hasActiveFilters =
    selectedDivision || selectedTourType || selectedGuests || selectedSort;

  return (
    <div className="col-span-3 w-full h-fit border border-muted rounded-lg p-5 space-y-5 sticky top-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Filters</h1>
        {hasActiveFilters && (
          <Button
            size="sm"
            variant="outline"
            className="transition-colors hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleClearFilter}
          >
            Clear Filter
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={(value) => updateParam("division", value)}
          value={selectedDivision ?? ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any division" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="mb-2">Tour Type</Label>
        <Select
          onValueChange={(value) => updateParam("tourType", value)}
          value={selectedTourType ?? ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any tour type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tour Types</SelectLabel>
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="mb-2">Guests</Label>
        <Select
          onValueChange={(value) => updateParam("minGuest", value)}
          value={selectedGuests ?? ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any group size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group Size</SelectLabel>
              {GUEST_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="mb-2">Sort By</Label>
        <Select
          onValueChange={(value) => updateParam("sort", value)}
          value={selectedSort ?? ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort</SelectLabel>
              {SORT_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
