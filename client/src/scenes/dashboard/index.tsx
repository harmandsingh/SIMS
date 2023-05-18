import { getUsername, isAuthenticated } from "@/App";
import Header from "@/components/Header";
import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userName = getUsername();
  const greeting = `Hello, ${userName}`;

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  });

  return (
    <Box
      height="100%"
      width="100%"
      display="grid"
      gap="1.5rem"
      m="2rem 1.25rem"
      sx={{ color: theme.palette.grey[100] }}
    >
      {userName && <Header title={greeting} subtitle="" />}
    </Box>
  );
};

export default Dashboard;
