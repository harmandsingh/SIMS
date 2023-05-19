import { getAllStudents } from "@/api/students.service";
import { Student } from "@/types/student";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const StudentsInfo = () => {
  const theme = useTheme();
  const [students, setStudents] = useState<Student[] | null>([]);
  const [error, setError] = useState();

  function isBoy(student: Student) {
    return student.gender === "M";
  }

  let numBoys = 0;
  let numGirls = 0;

  if (students) {
    numBoys = students?.filter(isBoy).length;
    numGirls = students?.length - numBoys;
  }

  const data = [
    { name: "Boy", value: numBoys },
    { name: "Girl", value: numGirls },
  ];

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  useEffect(() => {
    getAllStudents()
      .then((result) => setStudents(result!!))
      .catch((error) => setError(error));
  }, []);

  return (
    <Box height="100%" width="100%">
      <Typography
        variant="h3"
        m="1.5rem 14rem"
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
            cx="60%"
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
      {error && { error }}
    </Box>
  );
};

export default StudentsInfo;
