import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./row1";
import Row2 from "./row2";
import Row3 from "./row2";

//type Props = {};

const gridTemplateLargeScreens = `
 "a a b"
 "a a b"
 "a a b"
 "a a b"
 "a a b"
 "c d d"
 "c d d"
 "c d d"
 "c d d"
`;

const gridTemplateSmallScreens = `
 "a"
 "a"
 "a"
 "c"
 "c"
 "c"
 "g"
 "g"
 "g"
 "h"
 "h"
 "h"
 "h"
`;

const Stats = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      m="1.5rem 0 0 0"
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
      <Row2 />
    </Box>
  );
};

export default Stats;
