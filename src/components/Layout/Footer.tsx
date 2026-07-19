/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTripadvisor,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { BiChevronRight } from "react-icons/bi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/tours", label: "All Tours" },
    { href: "/tours/adventure", label: "Adventure Tours" },
    { href: "/tours/cultural", label: "Cultural Tours" },
    { href: "/tours/beach", label: "Beach Getaways" },
    { href: "/special-offers", label: "Special Offers" },
  ];

  const aboutLinks = [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Travel Blog" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
  ];

  const services = [
    { href: "/services", label: "All Services" },
    { href: "/custom-tours", label: "Custom Tours" },
    { href: "/group-tours", label: "Group Tours" },
    { href: "/private-tours", label: "Private Tours" },
    { href: "/travel-insurance", label: "Travel Insurance" },
  ];

  const supportLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
    { href: "/cancellation-policy", label: "Cancellation Policy" },
    { href: "/help", label: "Help Center" },
  ];

  const socialIcons = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    {
      icon: FaTripadvisor,
      href: "https://tripadvisor.com",
      label: "TripAdvisor",
    },
  ];

  const paymentIcons = [
    { icon: FaCcVisa, label: "Visa" },
    { icon: FaCcMastercard, label: "Mastercard" },
    { icon: FaCcAmex, label: "American Express" },
    { icon: FaPaypal, label: "PayPal" },
    { icon: FaApplePay, label: "Apple Pay" },
    { icon: FaGooglePay, label: "Google Pay" },
  ];

  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img
                src="https://togo.uxper.co/wp-content/uploads/2025/06/color.svg"
                alt="Rivora Tours"
                className="h-16 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Discover the world with Rivora Tours. We create unforgettable
              travel experiences with expertly curated tours and exceptional
              service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#f97316]"></span>
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#f97316] transition-colors flex items-center gap-2 group"
                  >
                    <BiChevronRight className="text-[#f97316] group-hover:translate-x-1 transition-transform text-xs" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 relative">
              About
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#f97316]"></span>
            </h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#f97316] transition-colors flex items-center gap-2 group"
                  >
                    <BiChevronRight className="text-[#f97316] group-hover:translate-x-1 transition-transform text-xs" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 relative">
              Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#f97316]"></span>
            </h3>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#f97316] transition-colors flex items-center gap-2 group"
                  >
                    <BiChevronRight className="text-[#f97316] group-hover:translate-x-1 transition-transform text-xs" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 relative">
              Support
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#f97316]"></span>
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#f97316] transition-colors flex items-center gap-2 group"
                  >
                    <BiChevronRight className="text-[#f97316] group-hover:translate-x-1 transition-transform text-xs" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information Row */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-[#f97316] text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-sm text-gray-800">123 Travel Avenue</p>
                <p className="text-sm text-gray-800">Downtown, City</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <FaPhoneAlt className="text-[#f97316] text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone</p>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-800 hover:text-[#f97316] transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-[#f97316] text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <a
                  href="mailto:info@rivora.com"
                  className="text-sm text-gray-800 hover:text-[#f97316] transition-colors"
                >
                  rivora@gmail.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <FaClock className="text-[#f97316] text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Hours</p>
                <p className="text-sm text-gray-800">24/7 Support</p>
                <p className="text-xs text-gray-500">Mon-Sun: 9AM - 9PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-gray-600">
                Get exclusive travel deals, destination guides, and updates
                delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#f97316] focus:ring-2 focus:ring-orange-100 transition-colors"
              />
              <button className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social & Payment Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Social Links */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="text-sm text-gray-600">Follow Us:</span>
              {socialIcons.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#f97316] hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end">
              <span className="text-sm text-gray-600">We Accept:</span>
              <div className="flex items-center gap-3">
                {paymentIcons.map((payment) => {
                  const Icon = payment.icon;
                  return (
                    <div
                      key={payment.label}
                      className="text-2xl text-gray-600 hover:text-[#f97316] transition-colors"
                      title={payment.label}
                    >
                      <Icon />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Partners Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Partners:</span>
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                <img
                  src="https://i.ibb.co/QFNjq6Qs/footer.png"
                  alt="Partners"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-sm text-gray-600">Certified:</span>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  ISO 9001
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  Travel Safe
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  Green Travel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-50 mt-8 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-sm text-gray-600">
              © {currentYear} Rivora Tours. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              Made with <IoMdHeart className="text-red-500 animate-pulse" /> by
              Rivora Team
            </p>
            <div className="flex gap-4">
              <Link
                href="/sitemap"
                className="text-xs text-gray-500 hover:text-[#f97316] transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="/accessibility"
                className="text-xs text-gray-500 hover:text-[#f97316] transition-colors"
              >
                Accessibility
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-gray-500 hover:text-[#f97316] transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
