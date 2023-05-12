import Login from "@/scenes/auth/login";
import Dashboard from "@/scenes/dashboard";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/layout";
<<<<<<< HEAD
import Homepage from "@/scenes/pages/homepage";
=======
import { themeSettings } from "./theme";
import Students from "./scenes/students";
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/login" element={<Login />} />
<<<<<<< HEAD
                <Route path="/profile" element={<div>Profile Page</div>} />
                <Route path="/homepage" element={<Homepage/>} />
=======
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad
              </Route>
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
