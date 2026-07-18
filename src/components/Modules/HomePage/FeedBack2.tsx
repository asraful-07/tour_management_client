// FeedBack2.tsx - Column 2 (Slowest)
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Emily Watson",
    location: "London, UK",
    rating: 4.9,
    text: "Our Sundarbans tour was absolutely incredible. The guide was knowledgeable and friendly.",
  },
  {
    name: "David Chen",
    location: "Singapore",
    rating: 5.0,
    text: "Everything was perfectly organized. The hotels and transport were excellent.",
  },
  {
    name: "Maria Garcia",
    location: "Madrid, Spain",
    rating: 4.8,
    text: "Great value for money. The tour exceeded our expectations in every way.",
  },
  {
    name: "James Wilson",
    location: "Sydney, Australia",
    rating: 5.0,
    text: "Unforgettable experience! The team took care of everything.",
  },
  {
    name: "Lisa Thompson",
    location: "Toronto, Canada",
    rating: 4.9,
    text: "Professional service from booking to the end of our journey. Highly recommended!",
  },
  {
    name: "Robert Kim",
    location: "Seoul, South Korea",
    rating: 5.0,
    text: "Best travel agency in Bangladesh. Very responsive and helpful.",
  },
  {
    name: "Sarah Johnson",
    location: "Seoul, South Korea",
    rating: 5.0,
    text: "Great value for money. The tour exceeded our expectations in every way.",
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

export default function FeedBack2() {
  // Duplicate testimonials for seamless scrolling
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="h-[600px] overflow-hidden relative mt-12">
      <motion.div
        animate={{ y: ["-50%", "0%"] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col"
      >
        {allTestimonials.map((item, index) => (
          <Card key={`col2-${index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
