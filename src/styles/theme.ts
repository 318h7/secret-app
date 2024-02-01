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
  
const size = {
    xs: '400px',
    sm: '600px',
    md: '900px',
    lg: '1280px',
    xl: '1440px',
    xxl: '1920px',
}
  
const sizeBreakpoints = {
    xs: `(max-width: ${size.xs})`,
    sm: `(max-width: ${size.sm})`,
    md: `(max-width: ${size.md})`,
    lg: `(max-width: ${size.lg})`,
    xl: `(max-width: ${size.xl})`,
    xxl: `(max-width: ${size.xxl})`,
}

export const theme: DefaultTheme = {
    elevation:{
        ground: `1px 1px 2px ${COLORS.dark}`,
        low: `2px 2px 2px ${COLORS.dark}`,
        high: `4px 4px 8px ${COLORS.dark}`
    },
    colors: COLORS,
    borderRadius: "4px",
    media: sizeBreakpoints
};