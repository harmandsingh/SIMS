import { HomeOutlined, SvgIconComponent, Home } from "@mui/icons-material";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";

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
    icon: SchoolIcon,
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
    icon: HomeOutlined,
  } as NavItem,
];
