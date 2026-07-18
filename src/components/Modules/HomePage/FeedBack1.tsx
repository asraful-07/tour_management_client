// FeedBack1.tsx - Column 1 (Fastest)
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arif Hossain",
    location: "Dhaka, Bangladesh",
    rating: 5.0,
    text: "Amazing travel experience! Everything was well planned and the team was very helpful throughout the journey.",
  },
  {
    name: "Nusrat Jahan",
    location: "Chattogram, Bangladesh",
    rating: 4.9,
    text: "The tour arrangements were excellent. Hotels, transportation, and guides were all very professional.",
  },
  {
    name: "Tanvir Ahmed",
    location: "Rajshahi, Bangladesh",
    rating: 5.0,
    text: "A wonderful experience with great service. The entire trip was smooth and memorable.",
  },
  {
    name: "Sadia Rahman",
    location: "Sylhet, Bangladesh",
    rating: 4.8,
    text: "Loved the whole journey! The team was friendly, responsive, and made our trip stress-free.",
  },
  {
    name: "Mahmudul Hasan",
    location: "Khulna, Bangladesh",
    rating: 4.9,
    text: "Great service and excellent planning. Our Sundarbans tour was an unforgettable experience.",
  },
  {
    name: "Faria Ahmed",
    location: "Barishal, Bangladesh",
    rating: 5.0,
    text: "Everything was perfectly organized. I really appreciate their dedication and support.",
  },
  {
    name: "Rakibul Islam",
    location: "Comilla, Bangladesh",
    rating: 4.9,
    text: "Professional team with amazing customer support. Highly recommended for travel lovers.",
  },
  {
    name: "Jannatul Ferdous",
    location: "Gazipur, Bangladesh",
    rating: 5.0,
    text: "One of the best travel experiences I've had. The service quality exceeded my expectations.",
  },
];

const Card = ({ item }: { item: (typeof testimonials)[0] }) => (
  <div className="mb-6 w-full max-w-sm mx-auto rounded-2xl border-2 border-[#FF4500]/10 bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-[#FF4500]/30 hover:scale-[1.02]">
    <Quote className="text-[#FF4500] mb-2 opacity-20" size={32} />
    <p className="mb-6 text-gray-600 leading-relaxed">{item.text}</p>
    <hr className="mb-4 border-[#FF4500]/20" />
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="text-gray-500 text-sm">{item.location}</p>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={15}
              className={`${
                i < Math.floor(item.rating)
                  ? "fill-[#FF4500] text-[#FF4500]"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-700 mt-1">
          {item.rating}
        </span>
      </div>
    </div>
  </div>
);

export default function FeedBack1() {
  // Duplicate testimonials for seamless scrolling
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="h-[600px] overflow-hidden relative">
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col"
      >
        {allTestimonials.map((item, index) => (
          <Card key={`col1-${index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
