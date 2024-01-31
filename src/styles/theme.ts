import type { DefaultTheme } from "styled-components";

const COLORS = {
    main: "#b1eb21",
    dark: "#242424",
    light: "#fff",
    error: "#ff3333",
    bg: "rgba(0, 0, 39, 0.8)",
    darkGrey: "rgba(0, 0, 0, 0.6)",
    grey: "rgba(0, 0, 0, 0.4)",
    lightGrey: "rgba(0, 0, 0, 0.1)",
} as const;

export const theme: DefaultTheme = {
    elevation:{
        ground: `1px 1px 2px ${COLORS.dark}`,
        low: `2px 2px 2px ${COLORS.dark}`,
        high: `4px 4px 8px ${COLORS.dark}`
    },
    colors: COLORS,
    borderRadius: "4px",
};