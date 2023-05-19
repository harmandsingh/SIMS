import Login from "@/scenes/auth/login";
import Dashboard from "@/scenes/dashboard";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Classes from "./scenes/classes";
import Courses from "./scenes/courses";
import Layout from "./scenes/layout";
import Stats from "./scenes/stats";
import Students from "./scenes/students";
import Teachers from "./scenes/teachers";
import Attendance from "./scenes/attendance";
import StudentsInfo from "./scenes/studentsInfo";

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
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/studentsinfo" element={<StudentsInfo />} />
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
