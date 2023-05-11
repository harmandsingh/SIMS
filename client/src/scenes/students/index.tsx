import { fetcher } from "@/api/students";
import { GetStudentsResponse } from "@/types/Students";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import useSWR from "swr";
import Header from "@/components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "fatherName", headerName: "Father Name", flex: 1 },
  { field: "motherName", headerName: "Mother Name", flex: 1 },
  { field: "dob", headerName: "Date of Birth", flex: 1 },
];

const Students = () => {
  const { data, isLoading } = useSWR<GetStudentsResponse>("students", fetcher);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  return (
    // <Box
    //   height="100%"
    //   width="100%"
    //   display="grid"
    //   gap="1.5rem"
    //   sx={{ color: theme.palette.grey[100] }}
    // >
    <Box m="1.5rem 2.5rem">
      <Header title="STUDENTS" subtitle="List of currently enrolled students" />
      <Box>
        <DataGrid
          loading={isLoading || !data?.data}
          getRowId={(row) => row.id}
          rows={data?.data || []}
          columns={columns}
          sx={{ color: theme.palette.grey[300] }}
        />
      </Box>
    </Box>
  );
};

export default Students;
