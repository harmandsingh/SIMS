import { getUsername, isAuthenticated } from "@/App";
import { getAllStudents } from "@/api/students.service";
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import StatBox from "@/components/Statbox";
import { Student } from "@/types/student";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Face3Icon from "@mui/icons-material/Face3";
import ClassIcon from "@mui/icons-material/Class";
import { Class } from "@/types/class";
import { getAllClasses } from "@/api/classes.service";
import { Teacher } from "@/types/teacher";
import { getAllTeachers } from "@/api/teachers.service";

import { PieChart, Pie, Sector, Cell, LineChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend } from 'recharts';
import DashboardBox from "@/components/DashboardBox";
import { attendance } from "@/studentData/data";
import { Palette } from "@mui/material";

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
      .then((result) => setStudents(result))
      .catch((error) => setError(error));

    getAllTeachers()
      .then((result) => setTeachers(result))
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
      
    </Box>
  );
};

export default Dashboard;
