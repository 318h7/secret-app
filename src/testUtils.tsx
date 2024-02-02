import React, { ReactElement } from 'react'
import {render, renderHook, RenderHookOptions, RenderOptions} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom'

import "./i18n";
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';

const CLIENT_OPTIONS = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      structuralSharing: false,
      refetchOnWindowFocus: false,
    },
  }
};

const getFreshClient = () => new QueryClient(CLIENT_OPTIONS);

// eslint-disable-next-line react-refresh/only-export-components
const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={getFreshClient()}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: Providers, ...options})

const customHookRender = <P extends object, R extends object>(
  hook: (props: P) => R,
  options?: Omit<RenderHookOptions<P>, 'wrapper'>,
) => renderHook(hook, {wrapper: Providers, ...options})

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render, customHookRender as renderHook }