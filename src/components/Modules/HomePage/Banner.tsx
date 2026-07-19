"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MapPin, Search } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/bg.png",
    title: "Your Next Great Journey Starts Here:",
    subtitle: "Explore the World with Us!",
    description:
      "Get ready to embark on the Our travel agency is dedicated to crafting unforgettable experiences that will leave you with lifelong memories.The world is full of wonders, and we're here to help you discover them. From exotic destinations to hidden gems, we curate journeys that cater to your unique travel style.",
  },
  {
    id: 2,
    image: "/images/bg1.png",
    title: "Discover Extraordinary:",
    subtitle: "Adventure Awaits You!",
    description:
      "From pristine beaches to majestic mountains, we curate journeys that inspire and transform. Your dream vacation is just a click away.Tour with us and experience the world like never before. Our expert guides and carefully crafted itineraries ensure that every moment of your trip is filled with excitement, discovery, and joy.",
  },
  {
    id: 3,
    image: "/images/bg2.png",
    title: "Create Lifelong Memories:",
    subtitle: "Travel with Passion!",
    description:
      "Experience the world through our expertly crafted tours. Every journey is designed to immerse you in culture, nature, and adventure.Tours travel with us and create memories that will last a lifetime. Our team of travel experts is dedicated to providing you with exceptional service, ensuring that your trip is seamless, enjoyable, and unforgettable.",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Side */}
                <div className="text-white">
                  {/* Location Icon - Top Left */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-orange-500 p-2 rounded-full">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-orange-300">
                      Find Your Perfect Destination
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-orange-400 mb-6 animate-fadeIn delay-200">
                    {slide.subtitle}
                  </h2>

                  {/* Location Search */}
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-2 flex items-center gap-2 max-w-xl animate-fadeIn delay-400 border border-white/20">
                    <div className="flex-1 flex items-center gap-2 px-4">
                      <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search destinations, cities, or countries..."
                        className="bg-transparent text-white placeholder:text-gray-300 outline-none w-full text-sm md:text-base"
                      />
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-105">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Popular Locations */}
                  <div className="flex flex-wrap gap-2 mt-4 animate-fadeIn delay-600">
                    <span className="text-sm text-gray-300 mr-2">Popular:</span>
                    {["Paris", "Bali", "Dubai", "Tokyo", "London"].map(
                      (location) => (
                        <button
                          key={location}
                          className="text-xs md:text-sm px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-200 border border-white/10"
                        >
                          {location}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Right Side - Description */}
                <div className="text-white lg:pl-8 animate-fadeIn delay-400">
                  <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-200">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
