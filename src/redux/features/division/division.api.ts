import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    getDivisions: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),

    getSingleDivision: builder.query({
      query: (slug: string) => ({
        url: `/division/${slug}`,
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),

    updateDivision: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/division/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    deleteDivision: builder.mutation({
      query: (id: string) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const {
  useAddDivisionMutation,
  useGetDivisionsQuery,
  useGetSingleDivisionQuery,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
} = divisionApi;
