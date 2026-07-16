// import { getDefaultDashboardRoute } from "@/lib/authUtils";
// import { getNavItemsByRole } from "@/lib/navItems";
// import { getUserInfo } from "@/services/auth.services";
// import { NavSection } from "@/types/dashboard.types";
// import DashboardNavbarContent from "./DashboardNavbarContent";

// const DashboardNavbar = async () => {
//   const userInfo = await getUserInfo();
//   const navItems: NavSection[] = getNavItemsByRole(userInfo?.role);

//   const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
//   return (
//     <DashboardNavbarContent
//       userInfo={userInfo}
//       navItems={navItems}
//       dashboardHome={dashboardHome}
//     />
//   );
// };

// export default DashboardNavbar;
"use client";

import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/navItems";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { NavSection } from "@/types/dashboard.types";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = () => {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const userInfo = userData?.data;

  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role);

  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
