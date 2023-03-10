import React, { ReactElement, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeState } from "../atoms/themeAtom";
import { themeSettings } from "./themeSettings";

interface CustomThemeProviderProps {
  children: ReactElement;
}

function CustomThemeProvider({
  children,
}: CustomThemeProviderProps): ReactElement {
  const mode = useRecoilValue(themeState);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
