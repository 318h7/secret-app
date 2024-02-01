import React, { ReactElement } from 'react'
import {render, renderHook, RenderHookOptions, RenderOptions} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom'

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

interface ProviderProps {
  client?: QueryClient;
}

// eslint-disable-next-line react/display-name
const getProviders = ({ client = testClient }: ProviderProps) => ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
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
  path = "/",
) => render(ui, {wrapper: getProviders({ path }), ...options})

const customHookRender = <P extends object, R extends object>(
  hook: (props: P) => R,
  options?: Omit<RenderHookOptions<P>, 'wrapper'>,
  client?: QueryClient,
) => renderHook(hook, {wrapper: getProviders({ client }), ...options})

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render, customHookRender as renderHook }