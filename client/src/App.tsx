import Login from "@/scenes/auth/login";
import Dashboard from "@/scenes/dashboard";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/layout";
import Students from "./scenes/students";
import Courses from "./scenes/courses";
import Classes from "./scenes/classes";

export const isAuthenticated = () => {
  if (localStorage.getItem("user")) {
    return true;
  }

  return false;
};

export const getUsername = () => {
  return localStorage.getItem("username");
};

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
