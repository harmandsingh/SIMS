import React, { useState } from "react";
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
import { themeSettings } from "@/theme";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

 type Props = {};

const Navbar = (props: Props) => {
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


        <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.primary.main[200]}>
          <SchoolIcon sx ={{fontSize:"30px"}}/>
        </FlexBetween>

          
      
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
                color: selected === "dashboard" ? "inherit" : palette.primary[700],
                textDecoration: "inherit",
              }}
            >
              Dashboard
            </Link>
          </Box>
          <FlexBetween gap="2rem" sx={{ color: palette.grey[300] }}>
          <Box sx={{ "&:hover": { color: palette.primary[300] } }}>
            <Link
              to="/profile"
              onClick={() => setSelected("profile")}
              style={{
                color: selected === "profile" ? "inherit" : palette.primary[700],
                textDecoration: "inherit",
              }}
            >
              Profile
            </Link>
          </Box>
          </FlexBetween>

          <FlexBetween gap="2rem" sx={{ color: palette.grey[300] }}>
          <Box sx={{ "&:hover": { color: palette.primary[300] } }}>
            <Link
              to="/homepage"
              onClick={() => setSelected("profile")}
              style={{
                color: selected === "homepage" ? "inherit" : palette.primary[700],
                textDecoration: "inherit",
              }}
            >
              Home Page
            </Link>
          </Box>
          </FlexBetween>

        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
