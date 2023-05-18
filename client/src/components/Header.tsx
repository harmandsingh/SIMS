import { Box, Typography, useTheme } from "@mui/material";

type HeaderProps = {
  title: string;
  subtitle: string;
};

const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h3"
        color={theme.palette.secondary.main}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography color={theme.palette.primary.light}>{subtitle}</Typography>
    </Box>
  );
};

export default Header;
