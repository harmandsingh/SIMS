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
import * as yup from "yup";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addStudent } from "@/api/students.service";
import { useNavigate } from "react-router-dom";
import { Student } from "@/types/student";

interface AddStudentModalProps {
  showStudentModal: boolean;
  setShowStudentModal: (value: boolean) => void;
}

export interface AddStudentFormInputs {
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
}

const addStudentSchema = yup.object().shape({
  name: yup.string().required(),
  fatherName: yup.string().required(),
  motherName: yup.string().required(),
  dob: yup.string().required(),
  phoneNumber: yup.string().required(),
  streetAddress: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
});

const AddStudentModal = ({
  showStudentModal,
  setShowStudentModal,
}: AddStudentModalProps) => {
  const theme = useTheme();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [response, setResponse] = useState<Student | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStudentFormInputs>({
    resolver: yupResolver(addStudentSchema),
  });

  const addStudentFormSubmitHandler: SubmitHandler<
    AddStudentFormInputs
  > = async (data: AddStudentFormInputs) => {
    try {
      // Get response from server
      const response = await addStudent(data);

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
        onSubmit={handleSubmit(addStudentFormSubmitHandler)}
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
            Add New Student
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
              error={!!errors.name}
              helperText={errors.name ? errors.name?.message : ""}
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
          name="fatherName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="name"
              label="FatherName"
              variant="outlined"
              error={!!errors.fatherName}
              helperText={errors.fatherName ? errors.fatherName?.message : ""}
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
          name="motherName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="name"
              label="motherName"
              variant="outlined"
              error={!!errors.motherName}
              helperText={errors.motherName ? errors.motherName?.message : ""}
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
          name="dob"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="dob"
              label="Date of Birth"
              variant="outlined"
              error={!!errors.dob}
              helperText={errors.dob ? errors.dob?.message : ""}
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
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="phoneNumber"
              variant="outlined"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber?.message : ""}
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
          name="streetAddress"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="name"
              label="streetAddress"
              variant="outlined"
              error={!!errors.streetAddress}
              helperText={errors.streetAddress ? errors.streetAddress?.message : ""}
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
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="name"
              label="city"
              variant="outlined"
              error={!!errors.city}
              helperText={errors.city ? errors.city?.message : ""}
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
          name="state"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="name"
              label="state"
              variant="outlined"
              error={!!errors.state}
              helperText={errors.state ? errors.city?.state : ""}
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
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="country"
              label="Country"
              variant="outlined"
              error={!!errors.country}
              helperText={errors.country ? errors.country?.message : ""}
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
          {error && console.log(error)}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AddStudentModal;
