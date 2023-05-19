import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FlexBetween from "./FlexBetween";

type Props = {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  sideText?: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const theme = useTheme();
  return (
    <FlexBetween
      color={theme.palette.primary.main}
      margin="1.25rem 1.25rem 0.1rem 1.25rem"
    >
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography
        variant="h6"
        fontWeight="700"
        color={theme.palette.secondary.main}
      >
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;
