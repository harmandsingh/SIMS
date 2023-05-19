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

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userName = getUsername();
  const greeting = `Hello, ${userName}!`;
  const [students, setStudents] = useState<Student[] | null>([]);
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
  }, []);

  return (
    <Box m="2rem 1.25rem">
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
          icon={PersonIcon}
        />
        <StatBox
          title="Teachers"
          value={students ? students.length : 0}
          description="Total Teachers Count"
          icon={PersonIcon}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
