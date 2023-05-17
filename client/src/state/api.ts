import { GetStudentsResponse } from "@/types/student";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Students"],
  endpoints: (build) => ({
    getStudents: build.query<GetStudentsResponse, void>({
      query: () => "students/",
      providesTags: ["Students"],
    }),
  }),
});

export const { useGetStudentsQuery } = api;
