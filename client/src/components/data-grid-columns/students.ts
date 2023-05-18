import { GridColDef } from "@mui/x-data-grid";

export const StudentColumns: GridColDef[] = [
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
