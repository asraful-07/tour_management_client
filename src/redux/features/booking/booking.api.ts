/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import {
  BookingListResponse,
  SingleBookingResponse,
} from "./booking.interface";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),

    getAllBookings: builder.query<BookingListResponse, any>({
      query: (params) => ({
        url: "/booking",
        method: "GET",
        params,
      }),
      providesTags: ["BOOKING"],
    }),

    getMyBookings: builder.query<BookingListResponse, void>({
      query: () => ({
        url: "/booking/my-bookings",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
    }),

    getSingleBooking: builder.query<SingleBookingResponse, string>({
      query: (bookingId) => ({
        url: `/booking/${bookingId}`,
        method: "GET",
      }),
      providesTags: ["BOOKING"],
    }),

    updateBookingStatus: builder.mutation({
      query: ({
        bookingId,
        statusData,
      }: {
        bookingId: string;
        statusData: Record<string, unknown>;
      }) => ({
        url: `/booking/${bookingId}/status`,
        method: "PATCH",
        data: statusData,
      }),
      invalidatesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useGetSingleBookingQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;
