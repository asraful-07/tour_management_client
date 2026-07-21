"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Grid3x3,
  LayoutGrid,
  Image as ImageIcon,
  Heart,
  Share2,
  Download,
  ZoomIn,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// --- Types ---
interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src: string;
  width: number;
  height: number;
  likes: number;
  downloads: number;
}

// --- Sample Data (Unsplash-inspired) ---
const galleryData: GalleryItem[] = [
  {
    id: "1",
    title: "Golden Hour Sunset",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=1200&fit=crop",
    width: 800,
    height: 1200,
    likes: 342,
    downloads: 1203,
  },
  {
    id: "2",
    title: "Urban Jungle",
    category: "City",
    src: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=1200&h=800&fit=crop",
    width: 1200,
    height: 800,
    likes: 215,
    downloads: 876,
  },
  {
    id: "3",
    title: "Mountain Majesty",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
    width: 800,
    height: 800,
    likes: 567,
    downloads: 2104,
  },
  {
    id: "4",
    title: "Neon Nights",
    category: "City",
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&h=1600&fit=crop",
    width: 1200,
    height: 1600,
    likes: 431,
    downloads: 987,
  },
  {
    id: "5",
    title: "Serene Lake",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&h=1200&fit=crop",
    width: 1600,
    height: 1200,
    likes: 789,
    downloads: 3102,
  },
  {
    id: "6",
    title: "Architectural Lines",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop",
    width: 1200,
    height: 800,
    likes: 198,
    downloads: 654,
  },
  {
    id: "7",
    title: "Wildflowers",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop",
    width: 800,
    height: 1200,
    likes: 623,
    downloads: 1789,
  },
  {
    id: "8",
    title: "Skyline View",
    category: "City",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop",
    width: 1200,
    height: 800,
    likes: 457,
    downloads: 1322,
  },
  {
    id: "9",
    title: "Minimalist Design",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=800&fit=crop",
    width: 800,
    height: 800,
    likes: 321,
    downloads: 945,
  },
];

const categories = ["All", "Nature", "City", "Architecture"];

// --- Main Gallery Component ---
export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    return galleryData.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
                Visual Stories
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100/90">
              Explore a curated collection of stunning photography from around
              the world.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-200/70" />
              <Input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-full border-0 bg-white/20 pl-12 pr-4 text-white placeholder:text-orange-200/70 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white/50 dark:bg-gray-800/40 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-orange-200/70 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  selectedCategory === category
                    ? "bg-white text-orange-600 shadow-lg dark:bg-gray-800 dark:text-orange-400"
                    : "bg-white/20 text-white/80 backdrop-blur-sm hover:bg-white/30 hover:text-white dark:bg-gray-800/30 dark:text-gray-300",
                )}
              >
                {category}
              </button>
            ))}
            {(searchQuery || selectedCategory !== "All") && (
              <button
                onClick={resetFilters}
                className="rounded-full bg-white/20 px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm transition-all hover:bg-white/30 hover:text-white"
              >
                Reset
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Gallery Controls */}
      <div className="sticky top-0 z-10 border-b border-orange-200/20 bg-white/60 backdrop-blur-md dark:border-gray-700/30 dark:bg-gray-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
            >
              {filteredItems.length} items
            </Badge>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-orange-100/50 p-1 dark:bg-gray-800/50">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-md p-1.5 transition-all",
                viewMode === "grid"
                  ? "bg-white text-orange-600 shadow-sm dark:bg-gray-700 dark:text-orange-400"
                  : "text-orange-600/60 hover:text-orange-600 dark:text-gray-400 dark:hover:text-gray-200",
              )}
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("masonry")}
              className={cn(
                "rounded-md p-1.5 transition-all",
                viewMode === "masonry"
                  ? "bg-white text-orange-600 shadow-sm dark:bg-gray-700 dark:text-orange-400"
                  : "text-orange-600/60 hover:text-orange-600 dark:text-gray-400 dark:hover:text-gray-200",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center text-center">
            <ImageIcon className="h-16 w-16 text-orange-300/50 dark:text-gray-600" />
            <h3 className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-300">
              No images found
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter.
            </p>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="mt-4 border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-gray-700 dark:text-orange-400 dark:hover:bg-gray-800"
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <motion.div
            layout
            className={cn(
              "grid gap-4",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl dark:bg-gray-800",
                    viewMode === "masonry" && "break-inside-avoid",
                    item.height > item.width && "row-span-2",
                  )}
                >
                  <Dialog>
                    <DialogTrigger>
                      <div className="cursor-pointer">
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{
                            aspectRatio: `${item.width}/${item.height}`,
                          }}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <h3 className="text-sm font-medium truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-white/70">
                            {item.category}
                          </p>
                        </div>
                        {/* Action Buttons */}
                        <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <button className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70">
                                  <Heart className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Like</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger>
                                <button className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70">
                                  <Share2 className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Share</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger>
                                <button className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70">
                                  <ZoomIn className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Preview</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-2xl">
                      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="h-auto max-h-[80vh] w-full object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <h2 className="text-2xl font-bold text-white">
                            {item.title}
                          </h2>
                          <div className="mt-2 flex items-center gap-4 text-sm text-white/80">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" /> {item.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="h-4 w-4" /> {item.downloads}
                            </span>
                            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <button className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-orange-200/20 bg-white/60 backdrop-blur-md dark:border-gray-700/30 dark:bg-gray-900/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2026 Visual Stories. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Powered by Unsplash</span>
              <span className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Made with ❤️
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
