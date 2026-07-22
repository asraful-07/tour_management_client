import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      title: "Dashboard",
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "profile",
          href: "/my-profile",
          icon: "User",
        },
      ],
    },
    {
      title: "Settings",
      // icon: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Lock",
        },
      ],
    },
  ];
};

const getAdminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "User Management",
        href: "/admin/dashboard/users-management",
        icon: "Users",
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        href: "/admin/dashboard/add-tour",
        icon: "Plus",
      },
      {
        title: "Tours Management",
        href: "/admin/dashboard/tours-management",
        icon: "MapPin",
      },
    ],
  },
  {
    title: "Tour Type Management",
    items: [
      {
        title: "Tour Type Management",
        href: "/admin/dashboard/add-tour-type",
        icon: "Category",
      },
    ],
  },
  {
    title: "Division Management",
    items: [
      {
        title: "Division Management",
        href: "/admin/dashboard/add-division",
        icon: "Category",
      },
    ],
  },
  {
    title: "Booking Management",
    items: [
      {
        title: "Booking Management",
        href: "/admin/dashboard/booking-management",
        icon: "ClipboardList",
      },
    ],
  },
  {
    title: "Payment Management",
    items: [
      {
        title: "Payment Management",
        href: "/admin/dashboard/payment-management",
        icon: "CreditCard",
      },
    ],
  },
];

const getGuideNavItems: NavSection[] = [
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        href: "/guide/dashboard/add-tour",
        icon: "Plus",
      },
      {
        title: "Tours Management",
        href: "/guide/dashboard/tours-management",
        icon: "MapPin",
      },
    ],
  },
  {
    title: "Tour Type Management",
    items: [
      {
        title: "Tour Type Management",
        href: "/guide/dashboard/add-tour-type",
        icon: "Category",
      },
    ],
  },
  {
    title: "Add Division Management",
    items: [
      {
        title: "Division Management",
        href: "/guide/dashboard/add-division",
        icon: "Category",
      },
    ],
  },
  {
    title: "Booking Management",
    items: [
      {
        title: "Booking Management",
        href: "/guide/dashboard/booking-management",
        icon: "ClipboardList",
      },
    ],
  },
];

const getUserNavItems: NavSection[] = [
  // {
  //   title: "User Panel",
  //   items: [
  //     {
  //       title: "User Dashboard",
  //       href: "/dashboard/stats",
  //       icon: "LayoutDashboard",
  //     },
  //   ],
  // },
  {
    title: "My Bookings",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/booking",
        icon: "ClipboardList",
      },
    ],
  },
  {
    title: "My Payments",
    items: [
      {
        title: "My Payments",
        href: "/dashboard/history",
        icon: "CreditCard",
      },
    ],
  },
  {
    title: "Reviews",
    items: [
      {
        title: "My Reviews",
        href: "/dashboard/my-reviews",
        icon: "Star",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "My Settings",
        href: "/dashboard/settings",
        icon: "Settings",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return [...commonItems, ...getAdminNavItems];

    case "GUIDE":
      return [...commonItems, ...getGuideNavItems];

    case "USER":
      return [...commonItems, ...getUserNavItems];

    default:
      return commonItems;
  }
};
