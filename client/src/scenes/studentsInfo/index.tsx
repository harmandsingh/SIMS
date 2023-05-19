import { isAuthenticated } from "@/App";
import { getAllStudents } from "@/api/students.service";
import { Student } from "@/types/student";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      navigate("/login");
    }

    getAllStudents()
      .then((result) => {
        if (result) {
          setStudents(result);
        }
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <Box height="100%" width="100%">
      <Typography
        variant="h3"
        m="1.5rem 1.25rem"
        fontWeight="bold"
        color={theme.palette.secondary.main}
      >
        Student Count Comparison By Gender
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
