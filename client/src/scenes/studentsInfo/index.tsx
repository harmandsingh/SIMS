import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Boy", value: 300 },
  { name: "Girl", value: 470 },
];

const StudentsInfo = () => {
  const theme = useTheme();
  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];
  return (
    <Box height="100%" width="100%">
      <Typography
        variant="h3"
        m="1.5rem 1.25rem"
        fontWeight="bold"
        color={theme.palette.secondary.main}
      >
        Students Comparison By Gender
      </Typography>
      <ResponsiveContainer width="80%" height="80%">
        <PieChart width={800} height={800}>
          <Pie
            dataKey="value"
            data={data}
            cx="55%"
            cy="50%"
            innerRadius={125}
            outerRadius={250}
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
    </Box>
  );
};

export default StudentsInfo;
