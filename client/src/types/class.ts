import { Course } from "./course";

export interface Class {
  id: string;
  name: string;
  courses: Course[];
  students: EnrolledStudent[];
}

interface EnrolledStudent {
  id: string;
  name: string;
}

export interface GetClassesResponse {
  data: Class[];
}
