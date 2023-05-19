import { getAllCourses } from "@/api/courses.service";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import { Course } from "@/types/course";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState<Course[] | null>([]);
  const [error, setError] = useState();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    getAllCourses()
      .then((result) => setCourses(result))
      .catch((error) => setError(error));
  }, []);

  return (
    <Box m="1.5rem 1.25rem">
      <Header title="Classes" subtitle="All classes in the school" />
      {courses ? (
        <Box
          mt="25px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.75%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {courses.map(({ id, name, description }: Course) => (
            <CourseCard
              key={id}
              id={id}
              name={name}
              description={description}
            />
          ))}
        </Box>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </Box>
  );
};

export default Courses;
