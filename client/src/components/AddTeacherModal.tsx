import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import CancelIcon from "@mui/icons-material/Cancel";
import { Teacher, TeachingClasses } from "@/types/teacher";
import { Course } from "@/types/course";
import * as yup from "yup";
import Courses from "@/scenes/courses";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTeacher } from "@/api/teachers.service";
import { useNavigate } from "react-router-dom";

interface AddStudenModalProps {
  showStudentModal: boolean;
  setShowStudentModal: (value: boolean) => void;
}

export interface AddTeacherFormInputs {
  name: string;
  email: string;
  dob: string;
  teachingCourses?: Course[];
  teachingClasses?: TeachingClasses[];
}

const addTeacherSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  dob: yup.string().required(),
});

const AddTeacherModal = ({
  showStudentModal,
  setShowStudentModal,
}: AddStudenModalProps) => {
  const theme = useTheme();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [response, setResponse] = useState<Teacher | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTeacherFormInputs>({
    resolver: yupResolver(addTeacherSchema),
  });

  const addTeacherFormSubmitHandler: SubmitHandler<
    AddTeacherFormInputs
  > = async (data: AddTeacherFormInputs) => {
    try {
      // Get response from server
      const response = await addTeacher(data);

      // Set the response
      setResponse(response);

      // Close the modal
      setShowStudentModal(false);

      window.location.reload();
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <Modal open={showStudentModal} onClose={() => setShowStudentModal(false)}>
      <Box
        component="form"
        onSubmit={handleSubmit(addTeacherFormSubmitHandler)}
        alignItems="center"
        borderRadius="12px"
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          bgcolor: "#21295c",
        }}
      >
        <FlexBetween mb="10px">
          <Typography variant="h4" color={theme.palette.primary.main}>
            {" "}
            Add New Teacher
          </Typography>
          <Button onClick={() => setShowStudentModal(!showStudentModal)}>
            <CancelIcon
              sx={{ fontSize: 30, color: theme.palette.primary.main }}
            />
          </Button>
        </FlexBetween>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="name"
              label="Name"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ""}
              margin="normal"
              fullWidth
              required
              autoFocus
              color="secondary"
              sx={{
                input: {
                  color: theme.palette.common.white,
                  "&::placeholder": {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ""}
              margin="normal"
              fullWidth
              required
              color="secondary"
              sx={{
                input: {
                  color: theme.palette.common.white,
                  "&::placeholder": {
                    color: theme.palette.grey[300],
                  },
                },
              }}
            />
          )}
        />
        <Controller
          name="dob"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="dob"
              label="Date of Birth"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ""}
              margin="normal"
              fullWidth
              required
              color="secondary"
              sx={{
                input: {
                  color: theme.palette.common.white,
                  "&::placeholder": {
                    color: theme.palette.grey[300],
                  },
                },
              }}
            />
          )}
        />
        <Controller
          name="teachingCourses"
          control={control}
          defaultValue={undefined}
          render={({ field }) => (
            <TextField
              {...field}
              label="Courses"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ""}
              margin="normal"
              fullWidth
              color="secondary"
              sx={{
                input: {
                  color: theme.palette.common.white,
                  "&::placeholder": {
                    color: theme.palette.grey[300],
                  },
                },
              }}
            />
          )}
        />
        <Controller
          name="teachingClasses"
          control={control}
          defaultValue={undefined}
          render={({ field }) => (
            <TextField
              {...field}
              label="Classes"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ""}
              margin="normal"
              fullWidth
              color="secondary"
              sx={{
                input: {
                  color: theme.palette.common.white,
                  "&::placeholder": {
                    color: theme.palette.grey[300],
                  },
                },
              }}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          Submit
        </Button>
        <Typography align="center" color={theme.palette.error.main}>
          {error && "Invalid Input, Please try again!"}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AddTeacherModal;
