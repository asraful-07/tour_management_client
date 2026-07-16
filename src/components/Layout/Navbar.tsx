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
} from "@/components/ui/navigation-menu";
import Logo from "../../../public/icons/Logo";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/blog", label: "Blog", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/admin/dashboard", label: "Dashboard", role: UserRole.admin },
  { href: "/guide/dashboard", label: "Dashboard", role: UserRole.guide },
  { href: "/dashboard/booking", label: "Dashboard", role: UserRole.user },
];

const getDashboardHref = (userRole?: string) => {
  if (userRole === UserRole.admin) return "/admin/dashboard";
  if (userRole === UserRole.guide) return "/guide/dashboard";
  if (userRole === UserRole.user) return "/dashboard/booking";
  return "/";
};

// Small helper component for dropdown rows
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
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "8px 10px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        color: "#333",
        fontFamily: "'DM Sans', sans-serif",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}

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
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
            <PopoverTrigger className="group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:bg-muted md:hidden">
              <svg
                className="pointer-events-none"
                width={16}
                height={16}
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
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks
                    .filter(
                      (link) =>
                        link.role === "PUBLIC" || link.role === currentRole,
                    )
                    .map((link) => (
                      <NavigationMenuItem key={link.href} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          closeOnClick
                          className="py-1.5"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>

            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks
                  .filter(
                    (link) =>
                      link.role === "PUBLIC" || link.role === currentRole,
                  )
                  .map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink
                        href={link.href}
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* <ModeToggle /> */}

          {/* Profile / Auth dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "4px 10px 4px 4px",
                background: dropdownOpen ? "#F7F4F0" : "transparent",
                border: "0.5px solid #E8E6DF",
                borderRadius: 40,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#F7F4F0")
              }
              onMouseLeave={(e) => {
                if (!dropdownOpen)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: avatarSrc ? "transparent" : "#FAECE7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#C84B31",
                    }}
                  >
                    {user ? initials : "?"}
                  </span>
                )}
              </div>

              {/* Name (desktop only) */}
              {user && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#333",
                    maxWidth: 90,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  className="max-sm:hidden"
                >
                  {displayName}
                </span>
              )}

              {/* Chevron */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  color: "#AAA",
                  transition: "transform 0.2s",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
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
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "#fff",
                  border: "0.5px solid #E8E6DF",
                  borderRadius: 14,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  minWidth: 200,
                  overflow: "hidden",
                  zIndex: 50,
                }}
              >
                {user ? (
                  <>
                    {/* User info header */}
                    <div
                      style={{
                        padding: "12px 14px 10px",
                        borderBottom: "0.5px solid #F0EDE6",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#1A1A1A",
                          marginBottom: 2,
                        }}
                      >
                        {displayName}
                      </div>
                      <div style={{ fontSize: 11, color: "#AAA" }}>
                        {user?.email}
                      </div>
                    </div>

                    {/* Menu items */}
                    <div style={{ padding: "6px" }}>
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
                        to={`${getDashboardHref(currentRole)}/orders`}
                        label="My Orders"
                        onClick={() => setDropdownOpen(false)}
                      />
                    </div>

                    {/* Logout */}
                    <div
                      style={{
                        padding: "6px",
                        borderTop: "0.5px solid #F0EDE6",
                      }}
                    >
                      <button
                        onClick={handleLogout}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                          padding: "8px 10px",
                          borderRadius: 8,
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#C0392B",
                          fontFamily: "'DM Sans', sans-serif",
                          transition: "background 0.12s",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "#FEE2E2")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent")
                        }
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  /* Not logged in */
                  <div style={{ padding: "6px" }}>
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
