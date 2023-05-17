// Need to use the React-specific entry point to allow generating React hooks
import type { GetStudentsResponse, Student } from "@/types/Students";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useId } from "react";


// Define a service using a base URL and expected endpoints
// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
//   reducerPath: "api1",
//   tagTypes: ["Students"],
//   endpoints: (build) => ({
//     getStudents: build.query<GetStudentsResponse, void>({

//     }),
//   }),
// });

//TagType: Student
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:4000/' }),
  reducerPath: "api",
  tagTypes: ["Student"],
  endpoints: (build) => ({
    //GET students
    getStudents: build.query<Array<GetStudentsResponse>, void>({          //<response, payload>
      query: () => "api/v1/students",
      providesTags: ["Student"],    
    }),
    
    //GET A student
    // getStudent: build.query<Student, String>({
    //   query: useId() => "api/v1/student/id", 
    // }),

    //POST student
    addStudent:build.mutation<Student, Partial<Student>>({
      query: (body) => ({
        url: `student`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Student', id: 'LIST'}],
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
//endpoint student api
export const { useAddStudentMutation, useGetStudentsQuery } = api;
