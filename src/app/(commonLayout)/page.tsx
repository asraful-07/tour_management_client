import Banner from "@/components/Modules/HomePage/Banner";
import BannerText from "@/components/Modules/HomePage/BannerText";
import Contact from "@/components/Modules/HomePage/Contact";
import FeedBack from "@/components/Modules/HomePage/FeedBack";
import Gallery from "@/components/Modules/HomePage/Gallery";
import StatCard from "@/components/Modules/HomePage/StatCard";
import Team from "@/components/Modules/HomePage/Team";
import Logo from "@/components/Modules/HomePage/Logo";
import Destinations from "@/components/Modules/HomePage/Destinations";
import RecentlyViewed from "./recently-viewed/page";

export default function HomePage() {
  return (
    <div className="mt-20">
      <Banner />
      <BannerText />
      <RecentlyViewed />
      <Contact />
      <FeedBack />
      <Gallery />
      <StatCard />
      <Team />
      <Destinations />
      <Logo />
    </div>
  );
}
