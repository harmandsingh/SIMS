import { Home, SvgIconComponent } from "@mui/icons-material";
import CalculateIcon from "@mui/icons-material/Calculate";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Face3Icon from "@mui/icons-material/Face3";
import FunctionsIcon from "@mui/icons-material/Functions";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PieChartIcon from "@mui/icons-material/PieChart";
import AssessmentIcon from "@mui/icons-material/Assessment";

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
    text: "Teachers",
    icon: SupervisorAccountIcon,
  } as NavItem,
  {
    text: "Classes",
    icon: ClassIcon,
  } as NavItem,
  {
    text: "Courses",
    icon: CategoryIcon,
  } as NavItem,
  {
    text: "Grades",
    icon: CalculateIcon,
  } as NavItem,
  {
    text: "Performance",
  } as NavItem,
  {
    text: "Stats",
    icon: FunctionsIcon,
  } as NavItem,
  {
    text: "Attendance",
    icon: EqualizerIcon,
  } as NavItem,
  {
    text: "Students Info",
    icon: PieChartIcon,
  } as NavItem,
  {
    text: "Student Class Ratio",
    icon: AssessmentIcon,
  } as NavItem,
];
