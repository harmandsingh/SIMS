import { login } from "@/api/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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

export interface LoginFormInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  // console.log("errors", errors);
  // console.log("watch email", watch("email"));

  const formSubmitHandler: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    login(data);
  };

  return (
    <Container component="data" maxWidth="xs">
      <Box
        color={theme.palette.primary.main}
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: theme.palette.background.paper,
          borderRadius: "12px",
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: "60px", mt: 4 }} />
        <Typography
          variant="h2"
          sx={{ color: theme.palette.secondary[500], mt: 1 }}
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
                sx={{ color: theme.palette.grey[100] }}
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
                sx={{ color: theme.palette.grey[100] }}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.secondary.main }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
