import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

interface LoginFormInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { palette } = useTheme();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  console.log("errors", errors);
  console.log("watch email", watch("email"));

  const formSubmitHandler: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    await fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <Container component="data" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 10,
          bgcolor: palette.grey[800],
        }}
      >
        <Typography component="h1" variant="h1" color={palette.grey[100]}>
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(formSubmitHandler)}
          alignItems="center"
          width="100%"
          sx={{ m: 2, p: 4 }}
        >
          <FlexBetween>
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
                  required={true}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ""}
                />
              )}
            />
          </FlexBetween>
          <Box>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  required={true}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ""}
                />
              )}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: palette.primary[400] }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
