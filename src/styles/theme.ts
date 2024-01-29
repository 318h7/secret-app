import type { DefaultTheme } from "styled-components";

const COLORS = {
    main: "#b1eb21",
    dark: "#242424",
    light: "#fff",
    error: "#ff3333",
    bg: "rgba(0,0, 39, 0.8)",
} as const;


export const theme: DefaultTheme = {
    elevation:{
        low: `4px 4px 8px ${COLORS.dark}`
    },
    colors: COLORS,
    borderRadius: "4px",
};