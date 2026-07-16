/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import { ITourListResponse, ITourPackage } from "@/types";

const normalizeTourListResponse = (response: unknown): ITourListResponse => {
  if (Array.isArray(response)) {
    return {
      data: response as ITourPackage[],
      meta: {},
    };
  }

  if (response && typeof response === "object") {
    const maybeResponse = response as {
      data?: unknown;
      meta?: Record<string, unknown>;
    };

    if (Array.isArray(maybeResponse.data)) {
      return {
        data: maybeResponse.data as ITourPackage[],
        meta: maybeResponse.meta ?? {},
      };
    }

    if (maybeResponse.data && typeof maybeResponse.data === "object") {
      const nested = maybeResponse.data as {
        data?: ITourPackage[];
        meta?: Record<string, unknown>;
      };

      return {
        data: nested.data ?? [],
        meta: nested.meta ?? {},
      };
    }
  }

  return {
    data: [],
    meta: {},
  };
};

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),
    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
    getTourTypes: builder.query({
      query: (params) => ({
        url: "/tour/tour-types",
        method: "GET",
        params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
    getAllTours: builder.query<ITourListResponse, unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => normalizeTourListResponse(response),
    }),
    getSingleTour: builder.query<any, string>({
      query: (slug) => ({
        url: `/tour/${slug}`,
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {
  useGetTourTypesQuery,
  useAddTourTypeMutation,
  useRemoveTourTypeMutation,
  useAddTourMutation,
  useGetAllToursQuery,
  useGetSingleTourQuery,
} = tourApi;
