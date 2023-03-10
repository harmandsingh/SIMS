import { ThemeState } from "../atoms/themeAtom";

export const themeSettings = (mode: ThemeState) => {
  if (mode === "dark") {
    return {
      palette: {
        mode: mode,
        // palette values for dark mode
        primary: {
          main: "#4d547d",
          light: "#4d547d",
        },
        secondary: {
          main: "#ffe3a3",
        },
        info: {
          main: "#666666",
        },
        background: {
          default: "#191F45",
          paper: "#21295c",
        },
      },
    };
  } else {
    return {
      palette: {
        mode: mode,
        primary: {
          main: "#f0f0f0",
          light: "#e0e0e0",
        },
        secondary: {
          main: "#cca752",
          light: "#997d3d",
        },
        info: {
          main: "#666666",
        },
        background: {
          default: "#ffffff",
          paper: "#f0f0f0",
        },
      },
    };
  }
};
