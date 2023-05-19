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
          sx={{ fontSize: 22 }}
          color={theme.palette.common.black}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography color={theme.palette.grey[800]}>
          {courses
            ? `Courses Offered: ${courses.length}`
            : `Courses Offered: 0`}
        </Typography>
        <Typography color={theme.palette.grey[800]}>
          {students
            ? `Total Students Enrolled: ${students.length}`
            : `Total Students Enrolled: 0`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
