import { getAllClasses } from "@/api/classes.service";
import ClassCard from "@/components/ClassCard";
import Header from "@/components/Header";
import { Class } from "@/types/class";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Classes = () => {
  const [classes, setClasses] = useState<Class[] | null>([]);
  const [error, setError] = useState();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    getAllClasses()
      .then((result) => setClasses(result))
      .catch((error) => setError(error));
  }, []);

  return (
    <Box m="1.5rem 1.25rem">
      <Header title="Classes" subtitle="All classes in the school" />
      {classes ? (
        <Box
          mt="25px"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.75%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {classes.map(({ id, name, courses, students }: Class) => (
            <ClassCard
              key={id}
              id={id}
              name={name}
              courses={courses}
              students={students}
            />
          ))}
        </Box>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </Box>
  );
};

export default Classes;
