import { getAllClasses } from "@/api/classes.service";
import { Class } from "@/types/class";
import { Student } from "@/types/student";
import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

interface classBarData {
  name: string;
  studentCount: number;
}

const StudentClassRatio = () => {
  const theme = useTheme();
  const [classes, setClasses] = useState<Class[] | null>([]);
  const [error, setError] = useState();
  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  let data: classBarData[] = [];

  function getSingleClass(singleClass: Class) {
    const classData: classBarData = {
      name: singleClass.name,
      studentCount: singleClass.students.length,
    };
    return classData;
  }

  if (classes) {
    classes.map((singleClass) => {
      if (singleClass) {
        if (singleClass.students) {
          const result: classBarData = {
            name: singleClass.name,
            studentCount: singleClass.students.length,
          };
          data.push(result);
        } else {
          const result: classBarData = {
            name: singleClass.name,
            studentCount: 0,
          };
          data.push(result);
        }
      }
    });
  }

  useEffect(() => {
    getAllClasses().then((response) => setClasses(response));
  }, []);

  return (
    <Box height="90%" width="100%" mt="2rem">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
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
    </Box>
  );
};
export default StudentClassRatio;
