"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";
import { ImagePlus, X, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Single Image Uploader ──────────────────────────────────────────────────

interface ImageUploaderProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const preview = value ? URL.createObjectURL(value) : null;

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      onChange(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [onChange],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  if (preview && value) {
    return (
      <div className="relative group w-full overflow-hidden rounded-xl border border-border bg-muted/30">
        <img
          src={preview}
          alt="Division preview"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <label
            htmlFor="img-upload-replace"
            className="cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Replace
            <input
              id="img-upload-replace"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="bg-white/20 hover:bg-red-500/80 backdrop-blur-sm text-white p-1.5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-2 left-3">
          <p className="text-white/90 text-xs font-medium drop-shadow truncate max-w-[200px]">
            {value.name}
          </p>
          <p className="text-white/60 text-xs">
            {(value.size / 1024).toFixed(0)} KB
          </p>
        </div>
      </div>
    );
  }

  return (
    <label
      htmlFor="img-upload"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200",
        isDragging
          ? "border-primary bg-primary/5 scale-[0.99]"
          : "border-border hover:border-primary/50 hover:bg-muted/40 bg-muted/20",
      )}
    >
      <div className="flex flex-col items-center gap-2 text-center px-4">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
            isDragging ? "bg-primary/15" : "bg-muted",
          )}
        >
          <ImagePlus
            className={cn(
              "w-5 h-5 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground",
            )}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Drop image here or{" "}
            <span className="text-primary underline underline-offset-2">
              browse
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            PNG, JPG, WEBP — up to 10 MB
          </p>
        </div>
      </div>
      <input
        id="img-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
    </label>
  );
}

// ─── Add Division Modal ─────────────────────────────────────────────────────

export function AddDivisionModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [addDivision, { isLoading }] = useAddDivisionMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      form.reset();
      setImage(null);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    try {
      await addDivision(formData).unwrap();
      toast.success("Division added successfully");
      handleOpenChange(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Division
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[460px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/60">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Add Division
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to create a new division.
          </p>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-5">
          <Form {...form}>
            <form
              id="add-division"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Division name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Division Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Northern Region"
                        className="h-10 rounded-lg bg-muted/30 border-border/70 focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Description{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of this division…"
                        className="resize-none min-h-[88px] rounded-lg bg-muted/30 border-border/70 focus-visible:ring-1 focus-visible:ring-primary text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>

            {/* Image Uploader (outside <form> but visually grouped) */}
            <div className="mt-5 space-y-1.5">
              <p className="text-sm font-medium">
                Cover Image{" "}
                <span className="text-destructive text-xs">*required</span>
              </p>
              <ImageUploader value={image} onChange={setImage} />
            </div>
          </Form>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t border-border/60 flex gap-2 sm:gap-2">
          <DialogClose>
            <Button
              variant="outline"
              className="flex-1 rounded-lg"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="add-division"
            className="flex-1 rounded-lg gap-2"
            disabled={!image || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Save Division"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
