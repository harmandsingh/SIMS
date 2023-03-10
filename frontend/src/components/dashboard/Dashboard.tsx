import React from "react";
import { useRecoilValue } from "recoil";
import { studentState } from "../../atoms/studentsAtom";

export const Dashboard = () => {
  const students = useRecoilValue(studentState);
  console.log(students);
  return <div>Dashboard</div>;
};
