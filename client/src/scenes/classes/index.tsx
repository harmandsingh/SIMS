import { getAllClasses } from "@/api/classes.service";
import { Class } from "@/types/class";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Classes = () => {
  const [classes, setClasses] = useState<Class[] | null>([]);
  const [error, setError] = useState();

  useEffect(() => {
    getAllClasses()
      .then((result) => setClasses(result))
      .catch((error) => setError(error));
  }, []);

  const theme = useTheme();

  return (
    <Box m="2rem 1.25rem">
      <Card>
        <CardContent>
          <Typography>{classes?.at(0)?.name}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Classes;
