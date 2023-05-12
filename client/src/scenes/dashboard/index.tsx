import { Box, useTheme } from "@mui/material";
<<<<<<< HEAD
import useSWR from "swr";

type Props = {};

export const ENDPOINT = "BASE_URL";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

const Dashboard = (props: Props) => {
  // const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { palette } = useTheme();

  const { data } = useSWR<GetStudentsResponse>("students", fetcher);
=======

const Dashboard = () => {
  const theme = useTheme();
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad

  return (
    <Box
      height="100%"
      width="100%"
      display="grid"
      gap="1.5rem"
<<<<<<< HEAD
      sx={{ color: palette.primary.main[500] }}
    >
      {data?.data && JSON.stringify(data.data)}
    </Box>
=======
      sx={{ color: theme.palette.grey[100] }}
    ></Box>
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad
  );
};

export default Dashboard;
