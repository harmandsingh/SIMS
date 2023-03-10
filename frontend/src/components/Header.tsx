import { Box, Typography } from "@mui/material";
import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h4"
        color="#fff6e0"
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color="#ffe3a3">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
