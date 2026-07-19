"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, X, ArrowUpRight } from "lucide-react";

const images = [
  "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-51-scaled-1080x1796.webp",
  "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-52-1536x1215.webp",
  "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-54-1536x1215.webp",
  "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-53-1536x1215.webp",
  "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-55-1536x1215.webp",
];

const GalleryItem = ({
  src,
  height,
  onZoom,
}: {
  src: string;
  height: string;
  onZoom: () => void;
}) => (
  <div
    className={`group relative overflow-hidden rounded-2xl ${height} cursor-pointer`}
  >
    <Image
      src={src}
      alt="gallery"
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* Overlay */}
    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onZoom();
        }}
        aria-label="View image"
        className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
      >
        <Plus className="h-7 w-7 text-black" />
      </button>
    </div>
  </div>
);

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-orange-600">
              Our Gallery
            </span>
            <h2 className="max-w-xl text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
              Journey Of A Lifetime: Create Unforgettable Memories
            </h2>
          </div>

          <Link
            href="https://promo-theme.com/travelite/gallery/"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Go to gallery
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-all duration-300 group-hover:bg-white group-hover:text-gray-900">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left */}
          <div className="space-y-6">
            <GalleryItem
              src={images[1]}
              height="h-[260px]"
              onZoom={() => setSelected(images[1])}
            />
            <GalleryItem
              src={images[2]}
              height="h-[260px]"
              onZoom={() => setSelected(images[2])}
            />
          </div>

          {/* Center */}
          <GalleryItem
            src={images[0]}
            height="h-[546px]"
            onZoom={() => setSelected(images[0])}
          />

          {/* Right */}
          <div className="space-y-6">
            <GalleryItem
              src={images[3]}
              height="h-[260px]"
              onZoom={() => setSelected(images[3])}
            />
            <GalleryItem
              src={images[4]}
              height="h-[260px]"
              onZoom={() => setSelected(images[4])}
            />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected}
              alt="Selected gallery image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
