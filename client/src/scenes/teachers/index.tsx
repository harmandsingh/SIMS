import { getAllTeachers } from "@/api/teachers.service";
import Header from "@/components/Header";
import { TeacherColumns } from "@/components/data-grid-columns/teachers";
import { Teacher } from "@/types/teacher";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[] | null>([]);
  const [error, setError] = useState();

  useEffect(() => {
    getAllTeachers()
      .then((result) => setTeachers(result!!))
      .catch((error) => setError(error));
  }, []);

  const theme = useTheme();

  return (
    <Box m="1.5rem 1.25rem">
      <Header title="Teachers" subtitle="Total Teachers Count" />
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
          (teachers ? (
            <DataGrid
              loading={!teachers}
              getRowId={(row) => row.id}
              rows={teachers || []}
              columns={TeacherColumns}
              sx={{ color: theme.palette.grey[300] }}
            />
          ) : (
            <CircularProgress color="secondary" />
          ))}
      </Box>
    </Box>
  );
};

export default Teachers;
