import { getAllStudents } from "@/api/students.service";
import Header from "@/components/Header";
import { StudentColumns } from "@/components/data-grid-columns/students";
import { Student } from "@/types/student";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AddEditStudentDialog from "@/components/data-grid-columns/addEditStudentDialog";
import FlexBetween from "@/components/FlexBetween";
import { Add } from "@mui/icons-material";
import {Modal, Form} from 'react-bootstrap';


const Students = () => {
  const [students, setStudents] = useState<Student[] | null>([]);
  const [error, setError] = useState();
  const [showAddEditStudentDialog, setShowAddEditStudentDialog] =
    useState(false);

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
        <Button
          onClick={() => setShowAddEditStudentDialog(true)}
          variant="contained"
        >
          Add New Student          
        </Button>
        
        
        
      </FlexBetween>

      <Box>

      {showAddEditStudentDialog && 
        <AddEditStudentDialog onDismiss={()=>setShowAddEditStudentDialog(false)} />}
      </Box>

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
