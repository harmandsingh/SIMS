import { fetcher } from "@/api/students";
import { GetStudentsResponse } from "@/types/Students";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import useSWR from "swr";
import Header from "@/components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//import  Button from "@material-ui/core";

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
  const { data, isLoading, error } = useSWR<GetStudentsResponse>(
    "students",
    fetcher
  );
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const print_current_page=window.print();

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
        // sx={{
        //   "&. MuiDataGrid-virtualScroller": {
        //     backgroundColor: theme.palette.primary[400],
        //   },
        // }}
      >
        {!error && (
          <DataGrid
            loading={isLoading || !data?.data}
            getRowId={(row) => row.id}
            rows={data?.data || []}
            columns={columns}
            sx={{ color: theme.palette.grey[300] }}
            // sx={{
            //   color: theme.palette.grey[300],
            //   boxShadow: 4,
            // borderColor: theme.palette.primary[400],
            // "&. MuiDataGrid-root": {
            //   border: "none",
            // },
            // "&. MuiDataGrid-cell": {
            //   borderBottom: "none",
            // },
            // "&. MuiDataGrid-columnHeaders": {
            //   backgroundColor: theme.palette.primary[500],
            //   color: theme.palette.secondary[100],
            //   borderBottom: "none",
            // },

            // "&. MuiDataGrid-footerContainer": {
            //   backgroundColor: theme.palette.primary[500],
            //   color: theme.palette.secondary[100],
            //   borderTop: "none",
            // },
            // "&. MuiDataGrid-toolbarContainer .MuiButton-text": {
            //   color: `${theme.palette.secondary[200]} !important`,
            // },
            // "&. MuiTablePagination-root": {
            //   color: theme.palette.grey[100],
            // },
            // }}
            
          />
        )}
        
      </Box>
    </Box>
  );
};

export default Students;
