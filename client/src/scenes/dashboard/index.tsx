import { GetStudentsResponse } from "@/types/Students";
import { Box, useTheme } from "@mui/material";
import useSWR from "swr";

// type Props = {};

export const ENDPOINT = "http://localhost:4000/api/v1";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

const Dashboard = () => {
  // const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { palette } = useTheme();

  const { data } = useSWR<GetStudentsResponse>("students", fetcher);

  return (
    <Box
      height="100%"
      width="100%"
      display="grid"
      gap="1.5rem"
      sx={{ color: palette.grey[100] }}
    >
      {data?.data && JSON.stringify(data.data)}
    </Box>
  );
};

export default Dashboard;
