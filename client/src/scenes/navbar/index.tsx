import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import SchoolIcon from "@mui/icons-material/School";

// type Props = {};

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* Left Side */}
      <FlexBetween gap="0.75rem">
        <SchoolIcon sx={{ fontSize: "30px" }} />
        <Typography variant="h4" fontSize="16px">
          SIMS
        </Typography>
      </FlexBetween>

      {/* Right Side */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/profile"
            onClick={() => setSelected("profile")}
            style={{
              color: selected === "profile" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Profile
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
