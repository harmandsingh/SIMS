import { logout } from "@/api/auth.service";
import FlexBetween from "@/components/FlexBetween";
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

type NavbarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
  const theme = useTheme();
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
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: theme.palette.grey[200] }} />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.primary.main}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            ml="1rem"
          >
            <InputBase
              placeholder="Search..."
              sx={{ color: theme.palette.grey[900] }}
            />
            <IconButton>
              <Search sx={{ color: theme.palette.grey[800] }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="2rem" sx={{ color: theme.palette.primary.main }}>
          <Box sx={{ "&:hover": { color: theme.palette.secondary.main } }}>
            <Link
              to="/"
              onClick={() => setSelected("dashboard")}
              style={{
                color:
                  selected === "dashboard"
                    ? "inherit"
                    : theme.palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              Home
            </Link>
          </Box>
          {/* <Box sx={{ "&:hover": { color: theme.palette.primary[100] } }}>
            <Link
              to="/homepage"
              onClick={() => setSelected("homepage")}
              style={{
                color:
                  selected === "homepage" ? "inherit" : theme.palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              Homepage
            </Link>
          </Box> */}
          <Box sx={{ "&:hover": { color: theme.palette.primary.main } }}>
            <Link
              to="/login"
              onClick={() => logout()}
              style={{
                color:
                  selected === "profile" ? "inherit" : theme.palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              Logout
            </Link>
          </Box>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
