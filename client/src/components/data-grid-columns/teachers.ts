import { Course } from "@/types/course";
import { TeachingClasses } from "@/types/teacher";
import { GridColDef } from "@mui/x-data-grid";

export const TeacherColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.75 },
  { field: "name", headerName: "Name", flex: 0.75 },
  { field: "email", headerName: "Email", flex: 0.75 },
  { field: "dob", headerName: "Date of Birth", flex: 0.75 },
  {
    field: "teachingCourses",
    headerName: "Courses",
    flex: 1,
    valueGetter: (tableData) => {
      let result: string[] = [];
      if (tableData.row.teachingCourses) {
        const teachingCourses: Course[] = tableData.row.teachingCourses;
        teachingCourses.map(({ name }: Course) => {
          result.push(name);
        });
      }
      return result.join(", ");
    },
  },
  {
    field: "teachingClasses",
    headerName: "Classes",
    flex: 1,
    valueGetter: (tableData) => {
      let result: string[] = [];
      if (tableData.row.teachingClasses) {
        const teachingClasses: Course[] = tableData.row.teachingClasses;
        teachingClasses.map(({ name }: TeachingClasses) => {
          result.push(name);
        });
      }
      return result.join(", ");
    },
  },
];
