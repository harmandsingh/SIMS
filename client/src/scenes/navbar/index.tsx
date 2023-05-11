import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import SchoolIcon from "@mui/icons-material/School";
import { Menu as MenuIcon, Search } from "@mui/icons-material";

// type Props = {};

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          <IconButton onClick={() => console.log("open/close sidebar")}>
            <MenuIcon sx={{ color: palette.grey[300] }} />
          </IconButton>
          <FlexBetween
            bgcolor="#2d2d34"
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase
              placeholder="Search..."
              sx={{ color: palette.grey[300] }}
            />
            <IconButton>
              <Search sx={{ color: palette.grey[300] }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="2rem" sx={{ color: palette.grey[300] }}>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
