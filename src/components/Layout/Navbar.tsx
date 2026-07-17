/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { UserRole } from "@/constants/role";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

// Dropdown item component for auth dropdown
function DropdownItem({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={to}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 w-full"
    >
      {label}
    </Link>
  );
}

// Navigation items for Tours dropdown
const tourItems = [
  { label: "All Tours", href: "/tours" },
  { label: "Tour Packages", href: "/tours/packages" },
  { label: "Tour Details", href: "/tours/details" },
  { label: "Recently Viewed", href: "/recently-viewed" },
  { label: "Booking Confirmation", href: "/booking/confirmation" },
];

// Navigation items for Pages dropdown
const pageItems = [
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing Plans", href: "/pricing" },
  { label: "Our Team", href: "/team" },
  { label: "FAQs", href: "/faqs" },
  { label: "Our Services", href: "/services" },
  { label: "Hotels", href: "/hotels" },
  { label: "Destinations", href: "/destinations" },
  { label: "Destination Details", href: "/destinations/details" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog List", href: "/blog" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const getDashboardHref = (userRole?: string) => {
  if (userRole === UserRole.admin) return "/admin/dashboard";
  if (userRole === UserRole.guide) return "/guide/dashboard";
  if (userRole === UserRole.user) return "/dashboard/booking";
  return "/";
};

export default function Navbar() {
  const { data: rawUser } = useUserInfoQuery(undefined);
  const user = rawUser?.data;
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentRole = user?.role;
  const avatarSrc = user?.customer?.avatar ?? user?.avatar ?? null;
  const displayName = user?.customer?.name ?? user?.name ?? "";
  const initials = displayName
    ? displayName
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-lg dark:bg-gray-900/70">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/">
            <Image
              src="https://dreamstour.dreamstechnologies.com/html/assets/img/logo-dark.svg"
              alt="Logo"
              width={140}
              height={40}
              className="h-12 w-44"
              priority
            />
          </Link>
        </div>

        {/* Center - Navigation Menu with Tours and Pages only */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              {/* Home link */}
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Home
                </Link>
              </NavigationMenuItem>

              {/* About link */}
              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  About
                </Link>
              </NavigationMenuItem>

              {/* Tours Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-gray-900 data-[state=open]:text-gray-900 transition-colors duration-200">
                  Tours
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-56 p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100">
                    {tourItems.map((item) => (
                      <NavigationMenuLink
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
                      >
                        {item.label}
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pages Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-gray-900 data-[state=open]:text-gray-900 transition-colors duration-200">
                  Pages
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-64 p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
                    {pageItems.map((item) => (
                      <NavigationMenuLink
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
                      >
                        {item.label}
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Contact link */}
              <NavigationMenuItem>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right - Auth/Profile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile menu trigger */}
          <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
            <PopoverTrigger className="group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200/50 bg-white/50 text-gray-600 transition hover:bg-gray-50 hover:border-gray-300 md:hidden backdrop-blur-sm">
              <svg
                className="pointer-events-none"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12"
                  className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                  d="M4 12H20"
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
              </svg>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-64 p-2 md:hidden bg-white/95 backdrop-blur-sm border-gray-200/50"
            >
              <div className="flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
                >
                  About
                </Link>
                <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Tours
                </div>
                {tourItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Pages
                </div>
                {pageItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
                >
                  Contact
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile / Auth dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50/80 transition-colors duration-200 border border-gray-200/50 backdrop-blur-sm bg-white/30"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center flex-shrink-0">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-orange-600">
                    {user ? initials : "?"}
                  </span>
                )}
              </div>

              {/* Name (desktop only) */}
              {user && (
                <span className="text-sm font-medium text-gray-700 max-sm:hidden">
                  {displayName}
                </span>
              )}

              {/* Chevron */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                className={`text-gray-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100/50 py-2 z-50">
                {user ? (
                  <>
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100/50">
                      <div className="font-semibold text-gray-900">
                        {displayName}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {user?.email}
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <DropdownItem
                        to={getDashboardHref(currentRole)}
                        label="Dashboard"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <DropdownItem
                        to={`${getDashboardHref(currentRole)}/profile`}
                        label="My Profile"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <DropdownItem
                        to={`${getDashboardHref(currentRole)}`}
                        label="My Bookings"
                        onClick={() => setDropdownOpen(false)}
                      />
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100/50 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  /* Not logged in */
                  <div className="py-1">
                    <DropdownItem
                      to="/login"
                      label="Login"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <DropdownItem
                      to="/register"
                      label="Create account"
                      onClick={() => setDropdownOpen(false)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
