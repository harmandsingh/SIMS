import { Box, Button, Dialog, TextField, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as StudentApi from "../../api/student";
import { StudentInput } from "../../api/student";
import { Student } from "../../atoms/studentsAtom";
import Header from "../../components/Header";

interface AddStudentProps {
  onDismiss: () => void;
  onAddStudent: (student: Student) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ onDismiss, onAddStudent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentInput>();

  const theme = useTheme();

  async function onSubmit(input: StudentInput) {
    try {
      const studentResponse = await StudentApi.createStudent(input);
      onAddStudent(studentResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Dialog
      open
      onClose={onDismiss}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box
        id="add-student"
        component="form"
        m="1rem 2.5rem"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Header subtitle="Add New Student" />
        <Box mt={3}>
          <TextField
            required
            id="name"
            label="Student Name"
            variant="filled"
            helperText={!!errors.name && "Student Name is Required"}
            error={!!errors.name}
            {...register("name", { required: true })}
          />
          <TextField
            required
            id="dob"
            label="Date of Birth"
            variant="filled"
            helperText={!!errors.dob && "Date of Birth is Required"}
            error={!!errors.dob}
            {...register("dob", { required: true })}
          />
        </Box>
        <Box mt={3}>
          <TextField
            required
            id="father-name"
            label="Father Name"
            variant="filled"
            helperText={!!errors.fatherName && "Father Name is Required"}
            error={!!errors.fatherName}
            {...register("fatherName", { required: true })}
          />
          <TextField
            required
            id="mother-name"
            label="Mother Name"
            variant="filled"
            helperText={!!errors.motherName && "Mother Name is Required"}
            error={!!errors.motherName}
            {...register("motherName", { required: true })}
          />
        </Box>
        <Box mt={3}>
          <TextField
            required
            id="address"
            label="Address"
            variant="filled"
            helperText={!!errors.address && "Address is Required"}
            error={!!errors.address}
            {...register("address", { required: true })}
          />
          <TextField
            required
            id="city"
            label="City"
            variant="filled"
            helperText={!!errors.city && "City is Required"}
            error={!!errors.city}
            {...register("city", { required: true })}
          />
          <TextField
            required
            id="state"
            label="State"
            variant="filled"
            helperText={!!errors.state && "State is Required"}
            error={!!errors.state}
            {...register("state", { required: true })}
          />
          <TextField
            required
            id="country"
            label="Country"
            variant="filled"
            helperText={!!errors.country && "Country is Required"}
            error={!!errors.country}
            {...register("country", { required: true })}
          />
        </Box>
        <Box mt={3}>
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="filled"
            {...register("phoneNumber")}
          />
        </Box>
        <Box m="3rem 0.5rem">
          <Button
            size="large"
            variant="contained"
            type="submit"
            form="add-student"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddStudent;
