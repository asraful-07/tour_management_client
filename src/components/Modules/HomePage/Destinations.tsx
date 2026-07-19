"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  {
    name: "Swiss Alps",
    image: "https://togo.uxper.co/wp-content/uploads/2025/04/img_city1-1.webp",
  },
  {
    name: "Santorini",
    image: "https://togo.uxper.co/wp-content/uploads/2025/04/img_city2-1.webp",
  },
  {
    name: "Kyoto",
    image: "https://togo.uxper.co/wp-content/uploads/2025/04/img_city3-1.webp",
  },
  {
    name: "Grand Canyon",
    image: "https://togo.uxper.co/wp-content/uploads/2025/04/img_city4-1.webp",
  },
];

export default function Destinations() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-orange-600">
              Top Destinations
            </span>
            <h2 className="max-w-lg text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
              We are committed to delivering unforgettable camping trips.
            </h2>
          </div>

          <Link
            href="https://togo.uxper.co/home-01/#"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            View more
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-all duration-300 group-hover:bg-white group-hover:text-gray-900">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="group relative h-[340px] overflow-hidden rounded-2xl cursor-pointer"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-[2px]"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Name */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1">
                  {dest.name}
                </h3>
                <span className="block h-0.5 w-0 bg-orange-500 transition-all duration-500 group-hover:w-10 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
