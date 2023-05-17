import FlexBetween from "@/components/FlexBetween";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavItem, NavItems } from "./SidebarItems";

type SidebarProps = {
  isNonMobile: boolean;
  drawerWidth: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.grey[900],
              backgroundColor: theme.palette.primary.main,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="2rem 2rem 2rem 1.5rem">
              <FlexBetween>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <SchoolIcon sx={{ fontSize: 70 }} />
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    ml="0.2rem"
                    mt="0.25rem"
                    color={theme.palette.grey[900]}
                  >
                    SIMS
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {NavItems.map((item: NavItem) => {
                if (!item.icon) {
                  return (
                    <Typography
                      fontSize="20px"
                      fontWeight="bold"
                      key={item.text}
                      sx={{ m: "2.25rem 0 1rem 3rem" }}
                    >
                      {item.text}
                    </Typography>
                  );
                }
                const lcText = item.text.toLowerCase();

                return (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary.main
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.common.black
                            : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1.25rem",
                          color:
                            active === lcText
                              ? theme.palette.common.black
                              : theme.palette.common.black,
                        }}
                      >
                        <item.icon sx={{ fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto " }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
