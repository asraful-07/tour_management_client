"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Users,
  MapPin,
  Compass,
  Heart,
  Award,
  Globe,
  Clock,
  Shield,
  Coffee,
  Camera,
  Mountain,
  TreePine,
  Waves,
  Sun,
  Star,
  Quote,
  ChevronRight,
  Play,
  Phone,
  Mail,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// --- Stats Data ---
const stats = [
  { icon: <Globe className="h-6 w-6" />, value: "50+", label: "Countries" },
  {
    icon: <Users className="h-6 w-6" />,
    value: "10K+",
    label: "Happy Travelers",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    value: "200+",
    label: "Destinations",
  },
  {
    icon: <Award className="h-6 w-6" />,
    value: "98%",
    label: "Satisfaction Rate",
  },
];

// --- Team Data ---
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    bio: "Passionate explorer with 15+ years of travel expertise.",
    social: { instagram: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Michael Chen",
    role: "Head Guide",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Mountain specialist and cultural immersion expert.",
    social: { instagram: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Emily Rodriguez",
    role: "Travel Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Creates personalized itineraries for unique experiences.",
    social: { instagram: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "David Kim",
    role: "Adventure Specialist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Certified in wilderness survival and extreme sports.",
    social: { instagram: "#", twitter: "#", linkedin: "#" },
  },
];

// --- Values Data ---
const values = [
  {
    icon: <Compass className="h-8 w-8" />,
    title: "Authentic Experiences",
    description:
      "We connect travelers with genuine local cultures and traditions.",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Safety First",
    description:
      "Your well-being is our priority with comprehensive safety protocols.",
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Sustainable Travel",
    description:
      "Committed to eco-friendly practices and supporting local communities.",
    color: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Excellence",
    description: "We strive for perfection in every journey we curate.",
    color:
      "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  },
];

// --- Testimonials Data ---
const testimonials = [
  {
    name: "Alex Thompson",
    role: "Solo Traveler",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote:
      "This team transformed my dream trip into reality. Every detail was perfect, and I felt completely supported throughout my journey.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Family Traveler",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    quote:
      "Traveling with kids has never been easier. They planned activities for all ages and made sure everyone had an unforgettable experience.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Adventure Seeker",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    quote:
      "The adventure packages are incredible! From trekking to cultural immersion, they delivered beyond my expectations.",
    rating: 5,
  },
];

// --- Section Component ---
const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={cn("px-4 py-16 sm:px-6 lg:px-8", className)}>
    {children}
  </section>
);

// --- Main About Page Component ---
export default function AboutPage() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="Travel Background"
            className="h-full w-full object-cover"
          />
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex min-h-[70vh] items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
                  <Compass className="mr-1 h-3 w-3" />
                  About Our Journey
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Crafting Unforgettable
                <span className="block bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Travel Experiences
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-lg text-white/90 sm:text-xl max-w-2xl"
              >
                We believe in the transformative power of travel. Since 2015,
                we&lsquo;ve been helping adventurers discover the world&lsquo;s
                most extraordinary places.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button className="bg-white text-slate-900 hover:bg-white/90 shadow-lg">
                  Our Story <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <Play className="mr-2 h-4 w-4" /> Watch Video
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-white/60">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <Section className="bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="mx-auto max-w-7xl"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800/50"
              >
                <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {stat.icon}
                </div>
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Our Story Section */}
      <Section>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col justify-center"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  Our Story
                </Badge>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
              >
                Born from a Passion for Discovery
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-lg text-slate-600 dark:text-slate-300"
              >
                What started as a small group of travel enthusiasts has grown
                into a community of over 10,000 happy explorers. Our mission is
                to make authentic travel accessible to everyone.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="mt-3 text-slate-600 dark:text-slate-300"
              >
                We carefully curate each journey, handpicking destinations and
                experiences that inspire wonder and create lasting memories.
                Every trip is designed with cultural respect, sustainability,
                and genuine connection in mind.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-6">
                <Button className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300">
                  Read Full Story
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop"
                    alt="Travel"
                    className="rounded-xl object-cover shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=400&fit=crop"
                    alt="Culture"
                    className="rounded-xl object-cover shadow-lg"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&h=350&fit=crop"
                    alt="Adventure"
                    className="rounded-xl object-cover shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop"
                    alt="Nature"
                    className="rounded-xl object-cover shadow-lg"
                  />
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 rounded-xl bg-white p-4 shadow-xl dark:bg-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-indigo-400"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      10K+ Travelers
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      And counting...
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section className="bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-3 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                Our Values
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
            >
              What Guides Us
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300"
            >
              These core principles shape every experience we create for our
              travelers.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800/50">
                  <CardContent className="p-6 text-center">
                    <div
                      className={cn(
                        "mx-auto mb-4 inline-flex rounded-xl p-3",
                        value.color,
                      )}
                    >
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Team Section */}
      <Section>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-3 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                Meet the Team
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
            >
              The Faces Behind Your Adventures
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300"
            >
              Passionate explorers dedicated to making your journey
              extraordinary.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 bg-white shadow-sm transition-all hover:shadow-lg dark:bg-slate-800/50">
                  <CardContent className="p-6 text-center">
                    <Avatar className="mx-auto h-24 w-24">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {member.role}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {member.bio}
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <FaInstagram className="h-4 w-4 text-pink-500" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <FaXTwitter className="h-4 w-4 text-black dark:text-white" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <FaFacebookF className="h-4 w-4 text-blue-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-3 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                Testimonials
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
            >
              What Our Travelers Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 bg-white shadow-sm dark:bg-slate-800/50">
                  <CardContent className="p-6">
                    <Quote className="mb-3 h-8 w-8 text-blue-400" />
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.image} />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA Section with Background Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
            alt="Travel CTA"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
        </div>

        <div className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            >
              Ready to Start Your Adventure?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
            >
              Join thousands of happy travelers who&lsquo;ve discovered the
              world with us. Your next journey starts here.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Button className="bg-white text-slate-900 hover:bg-white/90 shadow-lg">
                Explore Tours
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Info */}
      <Section className="border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                About
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Press Kit
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Support
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Safety
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Legal
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Connect
              </h4>
              <div className="mt-4 flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-slate-200 dark:border-slate-700"
                >
                  <FaInstagram className="h-4 w-4 text-pink-500" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-slate-200 dark:border-slate-700"
                >
                  <FaXTwitter className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-slate-200 dark:border-slate-700"
                >
                  <FaYoutube className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200/50 pt-8 text-center text-sm text-slate-500 dark:border-slate-800/50 dark:text-slate-400">
            © 2026 JourneyWise. All rights reserved.
          </div>
        </div>
      </Section>
    </div>
  );
}
