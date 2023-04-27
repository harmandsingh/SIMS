import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import * as StudentApi from "../../api/student";
import { studentState } from "../../atoms/studentsAtom";
import Header from "../../components/Header";
import AddStudent from "./AddStudent";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "fatherName", headerName: "Father Name", flex: 1 },
  { field: "motherName", headerName: "Mother Name", flex: 1 },
  { field: "dob", headerName: "Date of Birth", flex: 1 },
];

const Student = () => {
  const theme = useTheme();
  const [students, setStudents] = useRecoilState(studentState);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);

  useEffect(() => {
    async function loadStudents() {
      setIsLoading(true);
      try {
        const students = await StudentApi.fetchStudents();
        setStudents({ students: students });
        console.log(students);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadStudents();
    setIsLoading(false);
  }, []);

  return (
    <Box m="1rem 2.5rem">
      <Header title="Students" subtitle="Currently Enrolled Students" />
      <Button
        variant="contained"
        onClick={() => {
          setShowAddStudentDialog(true);
        }}
      >
        Add New Student
      </Button>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.light,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.light,
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary.main} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !students}
          getRowId={(row) => row._id}
          columns={columns}
          rows={students.students || []}
        />
      </Box>
      {showAddStudentDialog && (
        <AddStudent
          onDismiss={() => setShowAddStudentDialog(false)}
          onAddStudent={(newStudent) => {
            setStudents((prev) => ({
              ...prev,
              students: [...students.students, newStudent],
            }));
            setShowAddStudentDialog(false);
          }}
        />
      )}
    </Box>
  );
};

export default Student;
