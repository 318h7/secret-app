import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    elevation: {
      ground: string;
      low: string;
      high: string;
    },
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