import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./model/client";
import { Servers, Login } from "./pages";
import { theme, GlobalStyles } from "./styles";
import { ErrorBoundary, Layout, ProtectedRoute } from "./components";
import { PAGES } from "./constants";

const router = createBrowserRouter([
  {
    path: PAGES.ROOT,
    element: <Login />,
  },
  {
    path: PAGES.SERVERS,
    element: <ProtectedRoute><Servers /></ProtectedRoute>,
  },
]);

const App = () => (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );

export default App
