"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { IErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Images, Loader2, Plus, Trash2, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// ─── Schema

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  costFrom: z.string().min(1, "Cost is required"),
  startDate: z.date({ message: "Start date is required" }),
  endDate: z.date({ message: "End date is required" }),
  departureLocation: z.string().min(1, "Departure location is required"),
  arrivalLocation: z.string().min(1, "Arrival location is required"),
  included: z.array(z.object({ value: z.string() })),
  excluded: z.array(z.object({ value: z.string() })),
  amenities: z.array(z.object({ value: z.string() })),
  tourPlan: z.array(z.object({ value: z.string() })),
  maxGuest: z.string().min(1, "Max guest is required"),
  minAge: z.string().min(1, "Minimum age is required"),
  division: z.string().min(1, "Division is required"),
  tourType: z.string().min(1, "Tour type is required"),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Multiple Image Uploader ──────────────────────────────────────────────────

interface MultiImageUploaderProps {
  value: File[];
  onChange: (files: File[]) => void;
}

function MultiImageUploader({ value, onChange }: MultiImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming).filter((f) =>
      f.type.startsWith("image/"),
    );
    // deduplicate by name+size
    const merged = [
      ...value,
      ...newFiles.filter(
        (nf) => !value.some((v) => v.name === nf.name && v.size === nf.size),
      ),
    ];
    onChange(merged);
  };

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 select-none",
          isDragging
            ? "border-primary bg-primary/5 scale-[0.99]"
            : "border-border hover:border-primary/50 hover:bg-muted/40 bg-muted/20",
        )}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
            isDragging ? "bg-primary/15" : "bg-muted",
          )}
        >
          <Images
            className={cn(
              "w-5 h-5 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground",
            )}
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Drop images here or{" "}
            <span className="text-primary underline underline-offset-2">
              browse
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            PNG, JPG, WEBP — multiple allowed
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div
                key={`${file.name}-${idx}`}
                className="relative group rounded-lg overflow-hidden border border-border/50 aspect-video bg-muted"
              >
                <img
                  src={url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="bg-white/20 hover:bg-red-500/90 backdrop-blur-sm text-white p-1 rounded-md transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-[10px] truncate">{file.name}</p>
                </div>
              </div>
            );
          })}
          {/* Add more tile */}
          <div
            onClick={() => inputRef.current?.click()}
            className="aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 bg-muted/20 flex items-center justify-center cursor-pointer transition-all"
          >
            <Plus className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      )}

      {value.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {value.length} image{value.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

// ─── Dynamic List Section ─────────────────────────────────────────────────────

interface DynamicListProps {
  label: string;
  fields: { id: string }[];
  name: string;
  control: any;
  onAppend: () => void;
  onRemove: (index: number) => void;
  placeholder?: string;
}

function DynamicList({
  label,
  fields,
  name,
  control,
  onAppend,
  onRemove,
  placeholder,
}: DynamicListProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 px-2.5 rounded-lg gap-1 text-xs"
          onClick={onAppend}
        >
          <Plus className="w-3 h-3" />
          Add
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">
          No items yet. Click Add to start.
        </p>
      ) : (
        <div className="space-y-2">
          {fields.map((item, index) => (
            <div className="flex gap-2" key={item.id}>
              <FormField
                control={control}
                name={`${name}.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={placeholder}
                        className="h-9 rounded-lg bg-background border-border/70 focus-visible:ring-1 focus-visible:ring-primary text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/40"
                onClick={() => onRemove(index)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {children}
      </p>
      <div className="flex-1 h-px bg-border/50" />
    </div>
  );
}

// ─── Add Tour Page ────────────────────────────────────────────────────────────

export default function AddTour() {
  const [images, setImages] = useState<File[]>([]);

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const { data: tourTypeData } = useGetTourTypesQuery(undefined);
  const [addTour, { isLoading }] = useAddTourMutation();

  const divisionOptions = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    }),
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (tourType: { _id: string; name: string }) => ({
      value: tourType._id,
      label: tourType.name,
    }),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      costFrom: "",
      startDate: new Date(),
      endDate: new Date(3 * 24 * 60 * 60 * 1000),
      departureLocation: "",
      arrivalLocation: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlan: [{ value: "" }],
      maxGuest: "",
      minAge: "",
      division: "",
      tourType: "",
    },
  });

  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({ control: form.control, name: "included" });
  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = useFieldArray({ control: form.control, name: "excluded" });
  const {
    fields: amenitiesFields,
    append: appendAmenities,
    remove: removeAmenities,
  } = useFieldArray({ control: form.control, name: "amenities" });
  const {
    fields: tourPlanFields,
    append: appendTourPlan,
    remove: removeTourPlan,
  } = useFieldArray({ control: form.control, name: "tourPlan" });

  const handleSubmit = async (data: FormValues) => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    const toastId = toast.loading("Creating tour…");

    const tourData = {
      ...data,
      costFrom: Number(data.costFrom),
      minAge: Number(data.minAge),
      maxGuest: Number(data.maxGuest),
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included
        .filter((item: { value: string }) => item.value)
        .map((item: { value: string }) => item.value),
      excluded: data.excluded
        .filter((item: { value: string }) => item.value)
        .map((item: { value: string }) => item.value),
      amenities: data.amenities
        .filter((item: { value: string }) => item.value)
        .map((item: { value: string }) => item.value),
      tourPlan: data.tourPlan
        .filter((item: { value: string }) => item.value)
        .map((item: { value: string }) => item.value),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image));

    try {
      const res = await addTour(formData).unwrap();
      if (res.success) {
        toast.success("Tour created successfully", { id: toastId });
        form.reset();
        setImages([]);
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err: unknown) {
      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const inputCls =
    "h-10 rounded-lg bg-muted/30 border-border/70 focus-visible:ring-1 focus-visible:ring-primary";

  return (
    <div className="w-full max-w-4xl mx-auto px-5 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Add New Tour</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in all the details to publish a new tour package.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
        <Form {...form}>
          <form
            id="add-tour-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="divide-y divide-border/50"
          >
            {/* ── Basic Info ── */}
            <div className="p-6 space-y-5">
              <SectionLabel>Basic Info</SectionLabel>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Tour Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Cox's Bazar Beach Adventure"
                        className={inputCls}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Cox's Bazar"
                          className={inputCls}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="costFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Cost From (৳)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 15000"
                          type="number"
                          className={inputCls}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="maxGuest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Max Guests
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 25"
                          type="number"
                          className={inputCls}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Minimum Age
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 5"
                          type="number"
                          className={inputCls}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ── Classification ── */}
            <div className="p-6 space-y-5">
              <SectionLabel>Classification</SectionLabel>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Division
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={divisionLoading}
                      >
                        <FormControl>
                          <SelectTrigger className={cn(inputCls, "w-full")}>
                            <SelectValue placeholder="Select division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisionOptions?.map(
                            (item: { label: string; value: string }) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Tour Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={cn(inputCls, "w-full")}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tourTypeOptions?.map(
                            (option: { value: string; label: string }) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ── Travel Details ── */}
            <div className="p-6 space-y-5">
              <SectionLabel>Travel Details</SectionLabel>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="departureLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Departure Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Dhaka"
                          className={inputCls}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="arrivalLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Arrival Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Cox's Bazar"
                          className={inputCls}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Start Date */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium">
                        Start Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                inputCls,
                                "w-full justify-start font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1),
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Date */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium">
                        End Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                inputCls,
                                "w-full justify-start font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1),
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ── Description & Images ── */}
            <div className="p-6 space-y-5">
              <SectionLabel>Description & Media</SectionLabel>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the tour experience…"
                        className="resize-none min-h-[120px] rounded-lg bg-muted/30 border-border/70 focus-visible:ring-1 focus-visible:ring-primary text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-1.5">
                <p className="text-sm font-medium">
                  Tour Images{" "}
                  <span className="text-destructive text-xs">*required</span>
                </p>
                <MultiImageUploader value={images} onChange={setImages} />
              </div>
            </div>

            {/* ── Dynamic Lists ── */}
            <div className="p-6 space-y-4">
              <SectionLabel>Tour Details</SectionLabel>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DynamicList
                  label="Included"
                  fields={includedFields}
                  name="included"
                  control={form.control}
                  onAppend={() => appendIncluded({ value: "" })}
                  onRemove={removeIncluded}
                  placeholder="e.g. Accommodation"
                />
                <DynamicList
                  label="Excluded"
                  fields={excludedFields}
                  name="excluded"
                  control={form.control}
                  onAppend={() => appendExcluded({ value: "" })}
                  onRemove={removeExcluded}
                  placeholder="e.g. Travel insurance"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DynamicList
                  label="Amenities"
                  fields={amenitiesFields}
                  name="amenities"
                  control={form.control}
                  onAppend={() => appendAmenities({ value: "" })}
                  onRemove={removeAmenities}
                  placeholder="e.g. Free WiFi"
                />
                <DynamicList
                  label="Tour Plan"
                  fields={tourPlanFields}
                  name="tourPlan"
                  control={form.control}
                  onAppend={() => appendTourPlan({ value: "" })}
                  onRemove={removeTourPlan}
                  placeholder="e.g. Day 1: Arrival"
                />
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="px-6 py-4 bg-muted/20 flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                All fields marked{" "}
                <span className="text-destructive font-medium">*</span> are
                required
              </p>
              <Button
                type="submit"
                form="add-tour-form"
                className="rounded-lg px-6 gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating…
                  </>
                ) : (
                  "Create Tour"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
