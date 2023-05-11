import { Box, useTheme } from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box
      height="100%"
      width="100%"
      display="grid"
      gap="1.5rem"
      sx={{ color: theme.palette.grey[100] }}
    ></Box>
  );
};

export default Dashboard;
