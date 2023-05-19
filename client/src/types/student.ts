export interface Student {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  enrolledClass?: EnrolledClass;
  enrolledCourses?: EnrolledCourses[];
}

export interface EnrolledClass {
  id: string;
  name: string;
}

export interface EnrolledCourses {
  id: string;
  name: string;
}

export interface GetStudentsResponse {
  data: Student[];
}

export interface AddStudentResponse {
  result: Student;
}
