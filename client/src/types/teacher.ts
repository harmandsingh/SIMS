import { Course } from "./course";

export interface Teacher {
  id: string;
  name: string;
  email: string;
  dob: string;
  teachingCourses: Course[];
  teachingClasses: TeachingClasses[];
}

export interface TeachingClasses {
  id: string;
  name: string;
}

export interface GetTeachersResponse {
  data: Teacher[];
}

export interface AddTeacherResponse {
  result: Teacher;
}
