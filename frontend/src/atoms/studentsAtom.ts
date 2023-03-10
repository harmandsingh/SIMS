import { atom } from "recoil";

export interface Student {
  _id: string;
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

interface StudentState {
  selectedStudent?: Student;
  students: Student[];
}

const defaultStudentState: StudentState = {
  students: [],
};

export const studentState = atom<StudentState>({
  key: "studentState",
  default: defaultStudentState,
});
