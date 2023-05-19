import { getUsername, isAuthenticated } from "@/App";
import { getAllClasses } from "@/api/classes.service";
import { getAllStudents } from "@/api/students.service";
import { getAllTeachers } from "@/api/teachers.service";
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import StatBox from "@/components/Statbox";
import { Class } from "@/types/class";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";
import ClassIcon from "@mui/icons-material/Class";
import Face3Icon from "@mui/icons-material/Face3";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClassBarData } from "../studentClassRatio";

const data = [
  { name: "Boy", value: 400 },
  { name: "Girl", value: 300 },
];

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userName = getUsername();
  const greeting = `Hello, ${userName}!`;
  const [students, setStudents] = useState<Student[] | null>([]);
  const [teachers, setTeachers] = useState<Teacher[] | null>([]);
  const [classes, setClasses] = useState<Class[] | null>([]);
  const [error, setError] = useState();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  let classData: ClassBarData[] = [];

  function getSingleClass(singleClass: Class) {
    const classData: ClassBarData = {
      name: singleClass.name,
      studentCount: singleClass.students.length,
    };
    return classData;
  }

  if (classes) {
    classes.map((singleClass) => {
      if (singleClass) {
        if (singleClass.students) {
          const result: ClassBarData = {
            name: singleClass.name,
            studentCount: singleClass.students.length,
          };
          classData.push(result);
        } else {
          const result: ClassBarData = {
            name: singleClass.name,
            studentCount: 0,
          };
          classData.push(result);
        }
      }
    });
  }

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      navigate("/login");
    }

    // Get all students
    getAllStudents()
      .then((result) => {
        result && setStudents(result);
      })
      .catch((error) => setError(error));

    getAllTeachers()
      .then((result) => {
        result && setTeachers(result);
      })
      .catch((error) => setError(error));

    getAllClasses()
      .then((result) => {
        result && setClasses(result);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <Box height="85%" width="95%" m="1.5rem 1.25rem">
      {userName && (
        <Header title={greeting} subtitle="Welcome to your Dashboard" />
      )}
      <Box
        mt="25px"
        display="flex"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="2%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <StatBox
          title="Students"
          value={students ? students.length : 0}
          description="Total Students Enrolled"
          icon={Face3Icon}
        />
        <StatBox
          title="Teachers"
          value={teachers ? teachers.length : 0}
          description="Total Teachers Count"
          icon={SupervisorAccountIcon}
        />
        <StatBox
          title="Classes"
          value={classes ? classes.length : 0}
          description="Total Class Count"
          icon={ClassIcon}
        />
      </Box>
      <FlexBetween height="75%" width="90%" mt="2rem" columnGap="2rem">
        <>
          <Typography
            color={theme.palette.secondary.main}
            variant="h4"
            m="6rem 0rem -2.5rem 2rem"
          >
            Gender Ratio
          </Typography>
          <ResponsiveContainer width="50%" height="85%">
            <PieChart width={600} height={600}>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={115}
                outerRadius={230}
                fill={theme.palette.primary.main}
                label
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </>
        <>
          <ResponsiveContainer width="80%" height="90%">
            <BarChart
              width={500}
              height={300}
              data={classData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="studentCount" fill={theme.palette.primary.main} />
              {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
          </ResponsiveContainer>
        </>
      </FlexBetween>
    </Box>
  );
};

export default Dashboard;
