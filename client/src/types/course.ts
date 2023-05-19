export interface Course {
  id: string;
  name: string;
  description: string;
}

export interface GetCoursesResponse {
  data: Course[];
}
