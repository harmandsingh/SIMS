import { getUsername, isAuthenticated } from "@/App";
import { getAllClasses } from "@/api/classes.service";
import { getAllStudents } from "@/api/students.service";
import { getAllTeachers } from "@/api/teachers.service";
import BarChartComponent from "@/components/BarChart";
import DashboardBox from "@/components/DashboardBox";
import Header from "@/components/Header";
import StatBox from "@/components/Statbox";
import { Class } from "@/types/class";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";
import ClassIcon from "@mui/icons-material/Class";
import Face3Icon from "@mui/icons-material/Face3";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Row1 from "../stats/row1";
import Row2 from "../stats/row2";

const data = [
  { name: "Boy", value: 400 },
  { name: "Girl", value: 300 },
];

const Dashboard = () => {
  const palette = useTheme();
  const theme = useTheme();
  const navigate = useNavigate();
  const userName = getUsername();
  const greeting = `Hello, ${userName}!`;
  const [students, setStudents] = useState<Student[] | null>([]);
  const [teachers, setTeachers] = useState<Teacher[] | null>([]);
  const [classes, setClasses] = useState<Class[] | null>([]);
  const [error, setError] = useState();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      navigate("/login");
    }

    // Get all students
    getAllStudents()
      .then((result) => setStudents(result!!))
      .catch((error) => setError(error));

    getAllTeachers()
      .then((result) => setTeachers(result!!))
      .catch((error) => setError(error));

    getAllClasses()
      .then((result) => setClasses(result))
      .catch((error) => setError(error));
  }, []);

  return (
    <Box m="1.5rem 1.25rem">
      {userName && (
        <Header title={greeting} subtitle="Welcome to your Dashboard" />
      )}
      <Box
        mt="25px"
        display="flex"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="2%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <StatBox
          title="Students"
          value={students ? students.length : 0}
          description="Total Students Enrolled"
          icon={Face3Icon}
        />
        <StatBox
          title="Teachers"
          value={teachers ? teachers.length : 0}
          description="Total Teachers Count"
          icon={SupervisorAccountIcon}
        />
        <StatBox
          title="Classes"
          value={classes ? classes.length : 0}
          description="Total Class Count"
          icon={ClassIcon}
        />
      </Box>
      <Box width="100%" height="100%" display="grid" gap="1.5rem"></Box>
    </Box>
  );
};

export default Dashboard;
