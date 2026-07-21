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
import { useUpdateDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";
import { ImagePlus, X, Pencil, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Single Image Uploader ──────────────────────────────────────────────────

interface ImageUploaderProps {
  value: File | null;
  existingUrl?: string;
  onChange: (file: File | null) => void;
}

function ImageUploader({ value, existingUrl, onChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const preview = value ? URL.createObjectURL(value) : (existingUrl ?? null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith("image/")) onChange(file);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  if (preview) {
    return (
      <div className="relative group w-full overflow-hidden rounded-xl border border-border bg-muted/30">
        <img
          src={preview}
          alt="Division preview"
          className="w-full h-44 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <label
            htmlFor="img-edit-replace"
            className="cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Replace
            <input
              id="img-edit-replace"
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
        {value && (
          <div className="absolute bottom-2 left-3">
            <p className="text-white/90 text-xs font-medium drop-shadow truncate max-w-[200px]">
              {value.name}
            </p>
            <p className="text-white/60 text-xs">
              {(value.size / 1024).toFixed(0)} KB
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <label
      htmlFor="img-edit-upload"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
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
        id="img-edit-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
    </label>
  );
}

// ─── Edit Division Modal ────────────────────────────────────────────────────

interface Division {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

interface EditDivisionModalProps {
  division: Division;
}

export function EditDivisionModal({ division }: EditDivisionModalProps) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [updateDivision, { isLoading }] = useUpdateDivisionMutation();

  const form = useForm({
    defaultValues: {
      name: division.name,
      description: division.description ?? "",
    },
  });

  const resetFormState = useCallback(() => {
    form.reset({
      name: division.name,
      description: division.description ?? "",
    });
    setImage(null);
  }, [division.description, division.name, form]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      resetFormState();
    } else {
      resetFormState();
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (image) formData.append("file", image);

    try {
      await updateDivision({ id: division._id, data: formData }).unwrap();
      toast.success("Division updated successfully");
      handleOpenChange(false);
    } catch (err) {
      toast.error("Update failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 rounded-lg"
          title="Edit division"
        >
          <Pencil className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[460px] p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/60">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Edit Division
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update the details for{" "}
            <span className="font-medium text-foreground">{division.name}</span>
            .
          </p>
        </DialogHeader>

        <div className="px-6 py-5">
          <Form key={division._id} {...form}>
            <form
              id="edit-division"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
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

            <div className="mt-5 space-y-1.5">
              <p className="text-sm font-medium">
                Cover Image{" "}
                <span className="text-muted-foreground font-normal text-xs">
                  (leave empty to keep current)
                </span>
              </p>
              <ImageUploader
                value={image}
                existingUrl={division.image}
                onChange={setImage}
              />
            </div>
          </Form>
        </div>

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
            form="edit-division"
            className="flex-1 rounded-lg gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating…
              </>
            ) : (
              "Update Division"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
