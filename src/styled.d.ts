import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    elevation: {
      low: string;
    },
    colors: {
      main: string;
      dark: string;
      light: string;
      bg: string;
      error: string;
    };
  }
}