import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
        color={palette.grey[300]}
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#2d2d34",
          borderRadius: "12px",
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: "40px", mt: 4 }} />
        <Typography
          component="h1"
          variant="h1"
          sx={{ color: palette.grey[200], mt: 1 }}
        >
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(formSubmitHandler)}
          alignItems="center"
          width="100%"
          sx={{ p: 4 }}
        >
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
                autoFocus
                color="secondary"
                sx={{ color: palette.grey[100] }}
              />
            )}
          />
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
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
                margin="normal"
                fullWidth
                required
                color="secondary"
                sx={{ color: palette.grey[100] }}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: palette.secondary[500] }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
