import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Exploring Italy in 10 Days: A Complete Travel Itinerary",
    description:
      "Italy is a country known for its rich history, incredible art, and unforgettable food. This itinerary covers Rome, Florence, Venice, and the Amalfi Coast.",
    category: "UNCATEGORIZED",
    image:
      "https://togo.uxper.co/wp-content/uploads/2025/04/image-400x280.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "3 Days in Paris: A Short Escape to the City of Lights",
    description:
      "Paris is a city of romance, history, and culture. In just three unforgettable days you can experience iconic attractions and charming cafés.",
    category: "UNCATEGORIZED",
    image:
      "https://togo.uxper.co/wp-content/uploads/2025/04/rectangle_3298-1-400x280.webp",
  },
  {
    id: 3,
    title: "One Week in Japan: Tokyo, Kyoto & Osaka Adventure",
    description:
      "Japan is a country that blends cutting-edge technology with ancient traditions. Explore vibrant cities, temples and incredible food.",
    category: "UNCATEGORIZED",
    image:
      "https://togo.uxper.co/wp-content/uploads/2025/04/image-1-400x280.jpeg",
  },
  {
    id: 4,
    title: "5 Days in New York City: Landmarks, Culture & Neighborhoods",
    description:
      "The Big Apple never sleeps—and with just five days you can discover famous landmarks, Broadway, Central Park and local neighborhoods.",
    category: "UNCATEGORIZED",
    image:
      "https://togo.uxper.co/wp-content/uploads/2025/04/img_city3-1-400x280.webp",
  },
];

export default function Blog() {
  const featured = blogs.find((blog) => blog.featured);
  const others = blogs.filter((blog) => !blog.featured);

  return (
    <section className="container mx-auto px-4 pb-16">
      {/* Header row: title left, button right */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
        <h2 className="text-4xl font-semibold text-gray-900">Our Blog</h2>

        <Link
          href="https://togo.uxper.co/home-01/#"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
        >
          View more
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-all duration-300 group-hover:bg-white group-hover:text-gray-900">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </Link>
      </div>

      {/* 12-col grid: left 4 / right 8 */}
      <div className="grid grid-cols-12 gap-10">
        {/* Left Featured - col-span-4 */}
        <div className="group col-span-12 lg:col-span-5">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={featured!.image}
              alt={featured!.title}
              width={500}
              height={600}
              className="h-[500px] w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {featured!.category}
          </p>

          <h2 className="mt-3 text-2xl font-semibold leading-snug text-gray-900 transition group-hover:text-orange-500">
            {featured!.title}
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-500">
            {featured!.description}
          </p>

          <button className="group mt-8 font-medium">
            Read More
            <span className="mt-1 block h-[2px] w-full origin-left bg-black transition-transform duration-300 group-hover:scale-x-0" />
          </button>
        </div>

        {/* Right List - col-span-8 */}
        <div className="col-span-12 space-y-8 lg:col-span-7">
          {others.map((blog) => (
            <div
              key={blog.id}
              className="group flex flex-col gap-5 sm:flex-row"
            >
              <div className="overflow-hidden rounded-3xl sm:w-[230px]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={240}
                  height={180}
                  className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {blog.category}
                </p>

                <h3 className="mt-2 text-3xl font-semibold leading-snug transition group-hover:text-orange-500">
                  {blog.title}
                </h3>

                <p className="mt-3 text-lg leading-8 text-gray-500 line-clamp-2">
                  {blog.description}
                </p>

                <button className="group mt-6 font-medium">
                  Read More
                  <span className="mt-1 block h-[2px] w-full origin-left bg-black transition-transform duration-300 group-hover:scale-x-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
