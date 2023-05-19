import { getAllTeachers } from "@/api/teachers.service";
import AddStudenModal from "@/components/AddTeacherModal";
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import { TeacherColumns } from "@/components/data-grid-columns/teachers";
import { Teacher } from "@/types/teacher";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[] | null>([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getAllTeachers()
      .then((result) => setTeachers(result!!))
      .catch((error) => setError(error));
  }, []);

  const theme = useTheme();

  return (
    <Box m="1.5rem 1.25rem">
      <FlexBetween>
        <Header title="Teachers" subtitle="Total Teachers Count" />
        <Button onClick={() => setShowStudentModal(true)}>Add Student</Button>
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
      {showStudentModal && (
        <AddStudenModal
          showStudentModal={showStudentModal}
          setShowStudentModal={setShowStudentModal}
        />
      )}
    </Box>
  );
};

export default Teachers;
