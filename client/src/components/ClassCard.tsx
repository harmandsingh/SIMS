import { Class } from "@/types/class";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const ClassCard = ({ id, name, courses, students }: Class) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.75rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 26 }}
          fontWeight="bold"
          color="#21295c"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography color="#4d547d" sx={{ fontSize: 18 }}>
          {courses
            ? `Courses Offered: ${courses.length}`
            : `Courses Offered: 0`}
        </Typography>
        <Typography color="#4d547d" sx={{ fontSize: 18 }}>
          {students
            ? `Total Students Enrolled: ${students.length}`
            : `Total Students Enrolled: 0`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
