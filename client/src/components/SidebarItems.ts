import { HomeOutlined, SvgIconComponent, Home } from "@mui/icons-material";
import ClassIcon from "@mui/icons-material/Class";
import Face3Icon from "@mui/icons-material/Face3";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export interface NavItem {
  text: string;
  icon?: SvgIconComponent;
}

export const NavItems = [
  {
    text: "Dashboard",
    icon: Home,
  } as NavItem,
  {
    text: "Academic",
  } as NavItem,
  {
    text: "Students",
    icon: Face3Icon,
  } as NavItem,
  {
    text: "Classes",
    icon: ClassIcon,
  } as NavItem,
  {
    text: "Courses",
    icon: HomeOutlined,
  } as NavItem,
  {
    text: "Attendance",
    icon: HomeOutlined,
  } as NavItem,
  {
    text: "Grades",
    icon: HomeOutlined,
  } as NavItem,
  {
    text: "Management",
  } as NavItem,
  {
    text: "Teachers",
    icon: SupervisorAccountIcon,
  } as NavItem,
  {
    text: "Stats",
    icon: HomeOutlined,
  } as NavItem,
];
