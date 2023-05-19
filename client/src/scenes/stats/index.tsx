import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./row1";
import Row2 from "./row2";
import Row3 from "./row3";

//type Props = {};

const gridTemplateLargeScreens = `
 "a b c"
 "a b c"
 "a b c"
 
 
 "d h i"
 "g h i"
 "g h i"
 "g h i"
`;

const gridTemplateSmallScreens = `
 "a"
 "a"
 "b"
 "b"
 "b"
 "b"
 "c"
 "c"
 "c"
 "d"
 "d"
 "d"
 "e"
 "f"
 "f"
 "f"
 "g"
 "g"
 "g"
 "h"
 "h"
 "h"
 "h"
 "i"
 "i"
 "j"
 "j"
`;

const Stats = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10,minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 />
     
      <Row3 />
    </Box>
  );
};

export default Stats;
