import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Dashboard } from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import CustomThemeProvider from "./mui/CustomThemeProvider";
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
                <Route path="/student" element={<Student />} />
              </Route>
            </Routes>
          </CustomThemeProvider>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
