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
import { addCourse } from "@/api/courses.service";
import { Course } from "@/types/course";
  
  interface AddCourseModalProps {
    showCourseModal: boolean;
    setShowCourseModal: (value: boolean) => void;
  }
  
  export interface AddCourseFormInputs {
    id: number;
    name: string;
    description: string;
  }
  
  const addCourseSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required()
  });
  
  const AddCourseModal = ({
    showCourseModal,
    setShowCourseModal,
  }: AddCourseModalProps) => {
    const theme = useTheme();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [response, setResponse] = useState<Course | null>(null);
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<AddCourseFormInputs>({
      resolver: yupResolver(addCourseSchema),
    });
  
    const addCourseFormSubmitHandler: SubmitHandler<
      AddCourseFormInputs
    > = async (data: AddCourseFormInputs) => {
      try {
        // Get response from server
        const response = await addCourse(data);
  
        // Set the response
        setResponse(response);
  
        // Close the modal
        setShowCourseModal(false);
  
        window.location.reload();
      } catch (error: any) {
        setError(error);
      }
    };
  
    return (
      <Modal open={showCourseModal} onClose={() => setShowCourseModal(false)}>
        <Box
          component="form"
          onSubmit={handleSubmit(addCourseFormSubmitHandler)}
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
              Add New Courses
            </Typography>
            <Button onClick={() => setShowCourseModal(!showCourseModal)}>
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
                label="Course Name"
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
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="name"
                label="description"
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description ? errors.description?.message : ""}
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
  
  export default AddCourseModal;
  