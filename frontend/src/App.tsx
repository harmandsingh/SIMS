import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Dashboard } from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import CustomThemeProvider from "./mui/CustomThemeProvider";
import Login from "./pages/auth/login";
import Student from "./pages/student/Student";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <RecoilRoot>
          <CustomThemeProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="academic/student" element={<Student />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </CustomThemeProvider>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
