"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const team = [
  {
    name: "Sarah Mitchell",
    position: "Founder & CEO",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-11.webp",
  },
  {
    name: "James Carter",
    position: "Travel Consultant",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-12.webp",
  },
  {
    name: "Emily Rodriguez",
    position: "Tour Manager",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-13.webp",
  },
  {
    name: "Michael Chen",
    position: "Marketing Head",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-14.webp",
  },
  {
    name: "Olivia Bennett",
    position: "Customer Support Lead",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-15.webp",
  },
  {
    name: "David Thompson",
    position: "Operations Manager",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-16.webp",
  },
  {
    name: "Sarah Mitchell",
    position: "Founder & CEO",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-11.webp",
  },
  {
    name: "James Carter",
    position: "Travel Consultant",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-12.webp",
  },
  {
    name: "Emily Rodriguez",
    position: "Tour Manager",
    image:
      "https://promo-theme.com/travelite/wp-content/uploads/2024/07/travelite-13.webp",
  },
];

export default function Team() {
  return (
    <section className="py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="text-orange-500 font-semibold uppercase tracking-[3px]">
            Our Team
          </span>
          <h2 className="mt-2 text-4xl font-bold">Meet Our Team</h2>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
              1280: { slidesPerView: 6, spaceBetween: 24 },
            }}
            className="team-slider"
          >
            {team.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex justify-center pt-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {member.position}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom mt-8 flex justify-center gap-2"></div>
        </div>
      </div>

      <style jsx>{`
        :global(.team-slider) {
          padding: 20px 0 20px;
        }
        :global(.team-slider .swiper-wrapper) {
          padding: 10px 0;
        }
        :global(.swiper-pagination-custom) {
          position: relative !important;
          margin-top: 30px;
        }
        :global(.swiper-pagination-custom .swiper-pagination-bullet) {
          background: #d1d5db;
          opacity: 1;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        :global(.swiper-pagination-custom .swiper-pagination-bullet-active) {
          background: #f97316;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
        }
        :global(.swiper-pagination-custom .swiper-pagination-bullet:hover) {
          transform: scale(1.1);
        }
        :global(.team-slider .swiper-slide) {
          transition: all 0.3s ease;
        }
        :global(.team-slider .swiper-slide:hover) {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}
