import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookingStats: builder.query({
      query: () => ({
        url: "/stats/booking",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getPaymentStats: builder.query({
      query: () => ({
        url: "/stats/payment",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getUserStats: builder.query({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getTourStats: builder.query({
      query: () => ({
        url: "/stats/tour",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
  }),
});

export const {
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
  useGetUserStatsQuery,
  useGetTourStatsQuery,
} = statsApi;
