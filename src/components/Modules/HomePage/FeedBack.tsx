// FeedBack.tsx (Parent Component)
import FeedBack1 from "./FeedBack1";
import FeedBack2 from "./FeedBack2";
import FeedBack3 from "./FeedBack3";

export default function FeedBack() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-left">
          <p className="text-lg font-semibold text-[#FF4500]">Testimonials</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900">
            What Our Travelers Say
          </h2>
        </div>

        {/* 3 Columns - Vertical Scrolling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeedBack1 />
          <FeedBack2 />
          <FeedBack3 />
        </div>
      </div>
    </section>
  );
}
