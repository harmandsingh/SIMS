import { getAllStudents } from "@/api/students.service";
import AddStudentModal from "@/components/AddStudentModal";
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import { StudentColumns } from "@/components/data-grid-columns/students";
import { Student } from "@/types/student";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Students = () => {
  const [students, setStudents] = useState<Student[] | null>([]);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const [error, setError] = useState();

  useEffect(() => {
    getAllStudents()
      .then((result) => setStudents(result!!))
      .catch((error) => setError(error));
  }, []);

  // const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  return (
    <Box m="1.5rem 1.25rem">
      <FlexBetween>
        <Header
          title="Students"
          subtitle="List of currently enrolled students"
        />
        <Button onClick={() => setShowStudentModal(true)}>
          Add New Student
        </Button>
      </FlexBetween>
      <Box
        mt="25px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            color: theme.palette.grey[200],
          },
        }}
      >
        {!error &&
          (students ? (
            <DataGrid
              loading={!students}
              getRowId={(row) => row.id}
              rows={students || []}
              columns={StudentColumns}
              sx={{ color: theme.palette.grey[300] }}
            />
          ) : (
            <CircularProgress color="secondary" />
          ))}
      </Box>
      {showStudentModal && (
        <AddStudentModal
          showStudentModal={showStudentModal}
          setShowStudentModal={setShowStudentModal}
        />
      )}
    </Box>
  );
};

export default Students;
