<<<<<<< HEAD:client/src/scenes/navbar/index.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
=======
import FlexBetween from "@/components/FlexBetween";
import { Menu as MenuIcon, Search } from "@mui/icons-material";
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad:client/src/components/Navbar.tsx
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";
<<<<<<< HEAD:client/src/scenes/navbar/index.tsx
import FlexBetween from "@/components/FlexBetween";
import SchoolIcon from "@mui/icons-material/School";
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import { themeSettings } from "@/theme";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

 type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
=======
import { useState } from "react";
import { Link } from "react-router-dom";

type NavbarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
  const theme = useTheme();
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad:client/src/components/Navbar.tsx
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
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: theme.palette.grey[300] }} />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.primary[500]}
            borderRadius="9px"
            gap="3rem"
            p="0.3rem 1.5rem"
            ml="1rem"
          >
            <InputBase
              placeholder="Search..."
              sx={{ color: theme.palette.grey[100] }}
            />
            <IconButton>
              <Search sx={{ color: theme.palette.grey[300] }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="2rem" sx={{ color: theme.palette.grey[300] }}>
          <Box sx={{ "&:hover": { color: theme.palette.primary[100] } }}>
            <Link
              to="/"
              onClick={() => setSelected("dashboard")}
              style={{
<<<<<<< HEAD:client/src/scenes/navbar/index.tsx
                color: selected === "dashboard" ? "inherit" : palette.primary[700],
=======
                color:
                  selected === "dashboard"
                    ? "inherit"
                    : theme.palette.grey[700],
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad:client/src/components/Navbar.tsx
                textDecoration: "inherit",
              }}
            >
              Dashboard
            </Link>
          </Box>
<<<<<<< HEAD:client/src/scenes/navbar/index.tsx
          <FlexBetween gap="2rem" sx={{ color: palette.grey[300] }}>
          <Box sx={{ "&:hover": { color: palette.primary[300] } }}>
=======
          <Box sx={{ "&:hover": { color: theme.palette.primary[100] } }}>
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad:client/src/components/Navbar.tsx
            <Link
              to="/profile"
              onClick={() => setSelected("profile")}
              style={{
<<<<<<< HEAD:client/src/scenes/navbar/index.tsx
                color: selected === "profile" ? "inherit" : palette.primary[700],
=======
                color:
                  selected === "profile" ? "inherit" : theme.palette.grey[700],
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad:client/src/components/Navbar.tsx
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
