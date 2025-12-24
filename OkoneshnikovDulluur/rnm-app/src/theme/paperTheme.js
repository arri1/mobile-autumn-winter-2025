import { MD3LightTheme } from "react-native-paper";

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceVariant: "#F2F3F5",
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level0: "transparent",
      level1: "#FFFFFF",
      level2: "#FFFFFF",
    },

    outline: "#D0D4DA",
    onSurface: "#1F2328",
    onSurfaceVariant: "#4B5563",

    primary: "#2F80ED",
  },
};
