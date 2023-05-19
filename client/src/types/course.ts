export interface Course {
  id: string;
  name: string;
  description: string;
}

export interface GetCoursesResponse {
  data: Course[];
}


export interface AddCourseResponse{
  result: Course;
}