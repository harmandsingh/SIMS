import { Box, useTheme } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const data = [
//   { name: "Geeksforgeeks", students: 400 },
//   { name: "Technical scripter", students: 700 },
//   { name: "Geek-i-knack", students: 200 },
//   { name: "Geek-o-mania", students: 1000 },
//   { name: "Geek-o-mania", students: 500 },
//   { name: "Geek-o-mania", students: 250 },
//   { name: "Geek-o-mania", students: 100 },
//   { name: "Geek-o-mania", students: 100 },
//   { name: "Geek-o-mania", students: 100 },
//   { name: "Geek-o-mania", students: 100 },
// ];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Attendance = () => {
  const theme = useTheme();
  return (
    <Box width="100%" height="95%" mt="2rem">
      {/* <ResponsiveContainer width="100%" height="100%">
        <BarChart width={600} height={600} data={data}>
          <Bar dataKey="students" fill={theme.palette.primary.main} /> */}
      {/* <CartesianGrid stroke={theme.palette.primary.main} /> */}
      {/* <XAxis dataKey="name" />
          <YAxis />
        </BarChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Attendance;
