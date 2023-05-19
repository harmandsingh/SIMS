import { SvgIconComponent } from "@mui/icons-material";
import { Box, Icon, Typography, useTheme } from "@mui/material";
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
        backgroundColor: theme.palette.background.default,
        borderRadius: "0.55rem",
      }}
    >
      <FlexBetween>
        <Typography>{title}</Typography>
        <Icon>
          <icon />
        </Icon>
      </FlexBetween>
    </Box>
  );
};
