import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "simsApi",
  tagTypes: ["Student"],
  endpoints: (build) => ({
    getStudents: build.query({
      query: () => "/api/v1/academic/student",
      providesTags: ["Student"],
    }),
  }),
});

export const { useGetStudentsQuery } = api;
