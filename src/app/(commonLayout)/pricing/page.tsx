"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Star,
  Users,
  MapPin,
  Clock,
  Coffee,
  Wifi,
  Camera,
  Umbrella,
  Gift,
  Sparkles,
  Calendar,
  Award,
  Shield,
  Headphones,
  Plane,
  Hotel,
  Car,
  Utensils,
  TrendingUp,
  Zap,
  Crown,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// --- Types ---
interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  badge?: string;
  ctaText: string;
  ctaVariant: "default" | "outline" | "secondary" | "ghost" | "destructive";
  savings?: string;
  includes: string[];
  excludes?: string[];
}

// --- Sample Pricing Data ---
const pricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Explorer",
    description: "Perfect for solo travelers and weekend getaways.",
    price: 49,
    currency: "$",
    interval: "month",
    features: [
      "5 tours per month",
      "Basic itinerary planning",
      "Email support",
      "Access to standard tours",
      "Mobile app access",
    ],
    icon: <Plane className="h-6 w-6" />,
    color: "blue",
    gradient: "from-blue-500 to-cyan-400",
    ctaText: "Start Exploring",
    ctaVariant: "outline",
    includes: [
      "Standard tour packages",
      "24/7 customer support",
      "Mobile app access",
      "Basic travel insurance",
    ],
    excludes: ["Premium tours", "VIP experiences", "Private guides"],
  },
  {
    id: "pro",
    name: "Adventurer",
    description:
      "Ideal for couples and small groups seeking premium experiences.",
    price: 99,
    currency: "$",
    interval: "month",
    features: [
      "15 tours per month",
      "Advanced itinerary planning",
      "Priority support",
      "Access to premium tours",
      "Exclusive deals & discounts",
      "Flexible cancellation",
    ],
    popular: true,
    icon: <Crown className="h-6 w-6" />,
    color: "orange",
    gradient: "from-orange-500 to-amber-400",
    badge: "Most Popular",
    ctaText: "Get Pro Now",
    ctaVariant: "default",
    savings: "Save 20% annually",
    includes: [
      "All Explorer features",
      "Premium tour packages",
      "Priority customer support",
      "VIP experiences access",
      "Private guides available",
      "Flexible cancellation policy",
    ],
  },
  {
    id: "enterprise",
    name: "Voyager",
    description: "For travel agencies and large groups with custom needs.",
    price: 199,
    currency: "$",
    interval: "month",
    features: [
      "Unlimited tours",
      "Custom itinerary planning",
      "24/7 VIP support",
      "Access to all tours",
      "Exclusive VIP experiences",
      "Multi-language support",
      "API integration",
    ],
    icon: <Users className="h-6 w-6" />,
    color: "purple",
    gradient: "from-purple-500 to-pink-400",
    ctaText: "Contact Sales",
    ctaVariant: "secondary",
    includes: [
      "All Adventurer features",
      "Unlimited tours",
      "Custom itinerary design",
      "24/7 VIP support team",
      "Multi-language assistance",
      "API & integration support",
      "Dedicated account manager",
    ],
  },
];

// --- Features Icons Mapping ---
const featureIcons: Record<string, React.ReactNode> = {
  "Standard tour packages": <MapPin className="h-4 w-4" />,
  "24/7 customer support": <Headphones className="h-4 w-4" />,
  //   'Mobile app access': <Smartphone className="h-4 w-4" />,
  "Basic travel insurance": <Shield className="h-4 w-4" />,
  "Premium tour packages": <Star className="h-4 w-4" />,
  "Priority customer support": <Award className="h-4 w-4" />,
  "VIP experiences access": <Sparkles className="h-4 w-4" />,
  "Private guides available": <Users className="h-4 w-4" />,
  "Flexible cancellation policy": <Calendar className="h-4 w-4" />,
  "All Explorer features": <Check className="h-4 w-4" />,
  "All Adventurer features": <Check className="h-4 w-4" />,
  "Unlimited tours": <TrendingUp className="h-4 w-4" />,
  "Custom itinerary design": <Utensils className="h-4 w-4" />,
  "24/7 VIP support team": <Headphones className="h-4 w-4" />,
  "Multi-language assistance": <Users className="h-4 w-4" />,
  "API & integration support": <Zap className="h-4 w-4" />,
  "Dedicated account manager": <Users className="h-4 w-4" />,
};

// --- Helper Components ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Smartphone = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12" y2="18" />
  </svg>
);

// --- Main Pricing Page Component ---
export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  // Calculate annual price (20% discount)
  const getDisplayPrice = (price: number) => {
    if (isAnnual) {
      return Math.round(price * 12 * 0.8);
    }
    return price;
  };

  const getPriceLabel = () => {
    return isAnnual ? "/year" : "/month";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
              <Sparkles className="mr-1 h-3 w-3" />
              Flexible Plans for Every Traveler
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Choose Your
              <span className="block bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                Adventure Plan
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100/90">
              From weekend explorers to professional travel agencies — find the
              perfect plan that matches your journey.
            </p>
          </motion.div>

          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium transition-colors",
                !isAnnual ? "text-white" : "text-orange-200/70",
              )}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-amber-400"
            />
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium transition-colors",
                isAnnual ? "text-white" : "text-orange-200/70",
              )}
            >
              Annual
              <span className="ml-1.5 rounded-full bg-amber-400/30 px-2 py-0.5 text-xs text-amber-200">
                Save 20%
              </span>
            </Label>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {pricingTiers.map((tier, index) => {
              const isHovered = hoveredTier === tier.id;
              const isSelected = selectedTier === tier.id;
              const displayPrice = getDisplayPrice(tier.price);
              const priceLabel = getPriceLabel();

              return (
                <motion.div
                  key={tier.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredTier(tier.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                  className={cn(
                    "relative rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 dark:bg-gray-900/80",
                    tier.popular &&
                      "border-2 border-orange-400 shadow-2xl dark:border-orange-500",
                    isHovered && "transform -translate-y-2 shadow-2xl",
                    isSelected && "ring-2 ring-orange-500 ring-offset-2",
                  )}
                >
                  {/* Popular Badge */}
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-1 text-white shadow-lg">
                        <Star className="mr-1 h-3 w-3 fill-current" />
                        {tier.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Savings Badge */}
                  {isAnnual && tier.savings && (
                    <div className="absolute right-4 top-4">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      >
                        {tier.savings}
                      </Badge>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="flex flex-col">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <div
                          className={cn(
                            "mb-2 inline-flex rounded-xl p-2.5 text-white",
                            `bg-gradient-to-r ${tier.gradient}`,
                          )}
                        >
                          {tier.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {tier.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {tier.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {tier.currency}
                          {displayPrice}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {priceLabel}
                        </span>
                      </div>
                      {isAnnual && tier.price && (
                        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                          {tier.currency}
                          {tier.price}/month billed annually
                        </p>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="mb-6 flex-1 space-y-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        What&apos;s included:
                      </p>
                      <ul className="space-y-2.5">
                        {tier.includes.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300"
                          >
                            <span className="mt-0.5 text-orange-500">
                              {featureIcons[feature] || (
                                <Check className="h-4 w-4" />
                              )}
                            </span>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      {tier.excludes && tier.excludes.length > 0 && (
                        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                            Not included:
                          </p>
                          <ul className="mt-2 space-y-2">
                            {tier.excludes.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-sm text-gray-400 dark:text-gray-500"
                              >
                                <X className="mt-0.5 h-4 w-4" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={tier.ctaVariant}
                      className={cn(
                        "w-full transition-all duration-200",
                        tier.popular &&
                          "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-orange-500/25 dark:from-orange-600 dark:to-amber-600",
                        !tier.popular &&
                          "border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-gray-700 dark:text-orange-400 dark:hover:bg-gray-800",
                      )}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      {tier.ctaText}
                    </Button>

                    {/* Trust Badges */}
                    <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Secure
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        30-day trial
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        Cancel anytime
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Comparison Table Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All plans include access to our mobile app, customer support, and
            basic travel insurance.
            <br />
            Need a custom plan?{" "}
            <button className="font-medium text-orange-600 hover:underline dark:text-orange-400">
              Contact our team
            </button>
          </p>
        </motion.div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 rounded-2xl bg-white/60 p-8 backdrop-blur-sm dark:bg-gray-900/60"
        >
          <div className="text-center">
            <Badge className="mb-3 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
              <Gift className="mr-1 h-3 w-3" />
              All Plans Include
            </Badge>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Everything You Need for the Perfect Journey
            </h3>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <MapPin />, label: "Global Destinations" },
              { icon: <Users />, label: "Expert Guides" },
              { icon: <Camera />, label: "Photo Moments" },
              { icon: <Coffee />, label: "Local Experiences" },
              { icon: <Wifi />, label: "Stay Connected" },
              { icon: <Umbrella />, label: "Weather Protected" },
              { icon: <Hotel />, label: "Premium Stays" },
              { icon: <Car />, label: "Transport Included" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-xl bg-white/50 p-4 dark:bg-gray-800/50"
              >
                <div className="rounded-lg bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Have questions?{" "}
            <button className="font-medium text-orange-600 hover:underline dark:text-orange-400">
              Read our FAQ
            </button>{" "}
            or{" "}
            <button className="font-medium text-orange-600 hover:underline dark:text-orange-400">
              Chat with support
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
