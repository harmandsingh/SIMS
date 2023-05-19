import { login } from "@/api/auth.service";
import { User } from "@/types/user";
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
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState("");
  const [response, setRespone] = useState<User | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const formSubmitHandler: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    try {
      // Get response from server
      const response = await login(data);

      // Set the response
      setRespone(response);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  });

  return (
    <Container component="data" maxWidth="xs">
      <Box
        color={theme.palette.primary.main}
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: theme.palette.grey[800],
          borderRadius: "12px",
        }}
      >
        <LockOutlinedIcon
          sx={{ fontSize: "70px", mt: 4, color: theme.palette.primary.main }}
        />
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ color: theme.palette.primary.main, mt: 1 }}
        >
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(formSubmitHandler)}
          alignItems="center"
          color={theme.palette.common.black}
          width="100%"
          sx={{ p: 4, color: theme.palette.common.black }}
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
            Sign In
          </Button>
          <Typography align="center" color={theme.palette.error.main}>
            {error && "Invalid Credentials, Please try again!"}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
