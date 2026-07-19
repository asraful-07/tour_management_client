"use client";

import { useEffect, useRef, useState } from "react";
import { Users, MapPin, Backpack, Heart } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 45000,
    suffix: "K+",
    divide: 1000,
    label: "Happy campers",
  },
  { icon: MapPin, value: 80, suffix: "+", divide: 1, label: "Destinations" },
  { icon: Backpack, value: 1900, suffix: "+", divide: 1, label: "Trips sold" },
  { icon: Heart, value: 990, suffix: "+", divide: 1, label: "Travel buddies" },
];

function useCountUp(target: number, shouldStart: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [shouldStart, target, duration]);

  return count;
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  divide,
  label,
  shouldStart,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  divide: number;
  label: string;
  shouldStart: boolean;
}) {
  const count = useCountUp(value, shouldStart);
  const display = divide > 1 ? Math.floor(count / divide) : count;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-orange-300 hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-gray-900 tabular-nums">
          {display.toLocaleString()}
        </span>
        <span className="text-2xl font-bold text-orange-600">{suffix}</span>
      </div>

      <p className="mt-2 text-sm text-gray-500">{label}</p>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-10">
      <div className="container mx-auto px-4">
        {/* <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-orange-600">
            Trusted by thousands
          </span>
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            Your trusted camping guide
          </h2>
        </div> */}

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} shouldStart={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
