import { Student } from "../atoms/studentsAtom";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchStudents(): Promise<Student[]> {
  const response = await fetchData("/api/v1/academic/student", {
    method: "GET",
  });
  return response.json();
}

export interface StudentInput {
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber?: string;
}

export async function createStudent(student: StudentInput): Promise<Student> {
  const response = await fetchData("/api/v1/academic/student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response.json();
}

export async function deleteStudent(studentId: string) {
  await fetchData("/api/v1/academic/student", { method: "DELETE" });
}

export async function updateNote(
  studentId: string,
  student: StudentInput
): Promise<Student> {
  const response = await fetchData("/api/v1/academic/student" + studentId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response.json();
}
