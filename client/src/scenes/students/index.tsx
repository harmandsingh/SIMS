import { getAllStudents } from "@/api/students.service";
import Header from "@/components/Header";
import { Student } from "@/types/student";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 0.75 },
  { field: "fatherName", headerName: "Father Name", flex: 0.75 },
  { field: "motherName", headerName: "Mother Name", flex: 0.75 },
  { field: "dob", headerName: "Date of Birth", flex: 0.5 },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.75,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
  { field: "streetAddress", headerName: "Street Address", flex: 0.75 },
  { field: "city", headerName: "City", flex: 0.5 },
  { field: "state", headerName: "State", flex: 0.5 },
  { field: "country", headerName: "Country", flex: 0.5 },
];

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
      <Header title="STUDENTS" subtitle="List of currently enrolled students" />
      <Box
        mt="25px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            color: theme.palette.grey[200],
          },
        }}
      >
        {!error && (
          <DataGrid
            loading={!students}
            getRowId={(row) => row.id}
            rows={students || []}
            columns={columns}
            sx={{ color: theme.palette.grey[300] }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Students;
