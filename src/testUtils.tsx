import React, { ReactElement } from 'react'
import {render, renderHook, RenderHookOptions, RenderOptions} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./i18n";
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';

const testClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      structuralSharing: false,
      refetchOnWindowFocus: false,
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
const TestProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={testClient}>
          {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: TestProviders, ...options})

const customHookRender = <P extends object, R extends object>(
  hook: (props: P) => R,
  options?: Omit<RenderHookOptions<P>, 'wrapper'>,
) => renderHook(hook, {wrapper: TestProviders, ...options})

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render, customHookRender as renderHook }