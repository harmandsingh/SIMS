import { getAllCourses } from "@/api/courses.service";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import { Course } from "@/types/course";
import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FlexBetween from '@/components/FlexBetween';
import AddCourseModal from "@/components/AddCourseModal";

const Courses = () => {
  const [courses, setCourses] = useState<Course[] | null>([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
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
      <FlexBetween>
        <Header title="Courses" subtitle="All Courses in the school" />

        <Button onClick={() => setShowCourseModal(true)} variant="contained">
          Add a course
        </Button>
      </FlexBetween>
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
      {showCourseModal && (
        <AddCourseModal
          showCourseModal={showCourseModal}
          setShowCourseModal={setShowCourseModal}
        />
      )}
    </Box>
    
      
    
  );
};

export default Courses;
