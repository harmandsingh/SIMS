import { getAllStudents } from "@/api/students.service";
import Header from "@/components/Header";
import { StudentColumns } from "@/components/data-grid-columns/students";
import { Student } from "@/types/student";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Students = () => {
  const [students, setStudents] = useState<Student[] | null>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllStudents()
      .then((result) => setStudents(result))
      .catch((error) => setError(error));
  }, []);

  // const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  return (
    <Box m="2rem 1.25rem">
      <Header title="Students" subtitle="List of currently enrolled students" />
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
    </Box>
  );
};

export default Students;
