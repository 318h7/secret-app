import 'styled-components';

export interface Size {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    elevation: {
      ground: string;
      low: string;
      high: string;
    },
    media: Size,
    colors: {
      main: string;
      dark: string;
      light: string;
      bg: string;
      error: string;
      lightGrey: string;
      grey: string;
      darkGrey: string;
    };
  }
}