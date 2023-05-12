import { HomeOutlined, SvgIconComponent } from "@mui/icons-material";

export interface NavItem {
  text: string;
  icon?: SvgIconComponent;
}

export const NavItems = [
  {
    text: "Dashboard",
    icon: HomeOutlined,
  } as NavItem,
  {
    text: "Academic",
  } as NavItem,
  {
    text: "Students",
    icon: HomeOutlined,
  } as NavItem,
  {
    text: "Classes",
    icon: HomeOutlined,
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
