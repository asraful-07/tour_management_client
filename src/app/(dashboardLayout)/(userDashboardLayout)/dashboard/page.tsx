"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarDays, CreditCard, Heart, Star } from "lucide-react";

const bookingData = [
  { month: "Jan", bookings: 2 },
  { month: "Feb", bookings: 3 },
  { month: "Mar", bookings: 5 },
  { month: "Apr", bookings: 4 },
  { month: "May", bookings: 6 },
  { month: "Jun", bookings: 8 },
  { month: "Jul", bookings: 5 },
  { month: "Aug", bookings: 7 },
];

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">My Bookings</p>
              <h2 className="mt-2 text-3xl font-bold">24</h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <CalendarDays className="text-orange-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <h2 className="mt-2 text-3xl font-bold">$1,280</h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CreditCard className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Reviews</p>
              <h2 className="mt-2 text-3xl font-bold">18</h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Star className="text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Wishlist</p>
              <h2 className="mt-2 text-3xl font-bold">12</h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
              <Heart className="text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-semibold">Monthly Booking Overview</h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={bookingData}>
              <defs>
                <linearGradient id="booking" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#f97316"
                fill="url(#booking)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
