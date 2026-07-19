"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Compass,
  Phone,
  Mail,
  Clock,
  Star,
} from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
        {/* Left Side - Image with 40% off badge */}
        <motion.div
          className="relative flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-full min-h-[400px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/contact_us.png"
              alt="Contact Us"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent" />

            {/* 40% OFF Badge - Bottom Left */}
            <motion.div
              className="absolute bottom-6 left-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3,
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full p-6 md:p-8 shadow-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="text-xl md:text-3xl font-black block">
                      40%
                    </span>
                    <span className="text-base md:text-lg font-bold block">
                      OFF
                    </span>
                    <span className="text-xs md:text-sm block mt-1">
                      Limited Time
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="space-y-6 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Bringing Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 block">
              Travel Dreams to Life
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-gray-600 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Journey with us on fully customized itineraries through
            Indonesia&apos;s diverse waters — where private waves break, islands
            invite exploration, and biodiverse lands awaken your inner explorer.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            className="grid gap-4 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              {
                icon: MapPin,
                title: "Choose Destination",
                desc: "With nearly half a million attractions, hotels & more, you're sure to find joy.",
              },
              {
                icon: Calendar,
                title: "Check Availability",
                desc: "With nearly half a million attractions, hotels & more, you're sure to find joy.",
              },
              {
                icon: Compass,
                title: "Let's Go",
                desc: "With nearly half a million attractions, hotels & more, you're sure to find joy.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md border border-orange-100/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg text-white">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Info and Button */}
          <motion.div
            className="space-y-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* CTA Button */}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:bg-black hover:from-black hover:to-black text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                <span>Contact Us Now</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
