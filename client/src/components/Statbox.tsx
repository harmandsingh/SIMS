import { SvgIconComponent } from "@mui/icons-material";
import { Box, SvgIcon, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

interface StatBoxProps {
  title: string;
  value: number;
  icon: SvgIconComponent;
  description: string;
}

const StatBox = ({ title, value, icon, description }: StatBoxProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        gridColumn: "span 2",
        gridRow: "span 1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: "1.25rem 1rem",
        flex: "1 1 100%",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.75rem",
      }}
    >
      <FlexBetween>
        <Typography variant="h5" fontWeight={600} color="#21295c">
          {title}
        </Typography>
        <SvgIcon
          component={icon}
          sx={{
            fontSize: 50,
            color: "#21295c",
          }}
        />
      </FlexBetween>
      <Typography
        variant="h4"
        fontWeight="bold"
        color={theme.palette.secondary.dark}
      >
        {value}
      </Typography>
      <FlexBetween gap="2rem">
        <Typography variant="h6" color={"#4d547d"}>
          {description}
        </Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
