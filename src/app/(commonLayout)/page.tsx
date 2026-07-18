import Banner from "@/components/Modules/HomePage/Banner";
import BannerText from "@/components/Modules/HomePage/BannerText";
import FeedBack from "@/components/Modules/HomePage/FeedBack";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="mt-20">
      <Banner />

      <BannerText />
      <FeedBack />
      <div className="container mx-auto px-4 py-12">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click me
        </Button>
        <h1>HomePage home</h1>
      </div>
    </div>
  );
}
