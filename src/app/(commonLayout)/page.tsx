import Banner from "@/components/Modules/HomePage/Banner";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="mt-20">
      <Banner />
      <div className="container mx-auto px-4 py-12">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click me
        </Button>
        <h1>HomePage</h1>
      </div>
    </div>
  );
}
