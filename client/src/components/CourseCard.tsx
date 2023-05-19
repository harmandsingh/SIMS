import { Course } from "@/types/course";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const CourseCard = ({ id, name, description }: Course) => {
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
          fontWeight="bold"
          color="#21295c"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography color={theme.palette.grey[800]}>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
