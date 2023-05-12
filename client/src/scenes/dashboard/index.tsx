import { GetStudentsResponse } from "@/types/Students";
import { Box, useTheme } from "@mui/material";
import useSWR from "swr";

type Props = {};

export const ENDPOINT = "BASE_URL";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

const Dashboard = (props: Props) => {
  // const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { palette } = useTheme();

  const { data } = useSWR<GetStudentsResponse>("students", fetcher);

  return (
    <Box
      height="100%"
      width="100%"
      display="grid"
      gap="1.5rem"
      sx={{ color: palette.primary.main[500] }}
    >
      {data?.data && JSON.stringify(data.data)}
    </Box>
  );
};

export default Dashboard;
