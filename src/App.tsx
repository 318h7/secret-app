import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./model/client";
import { Servers, Login } from "./pages";
import { theme } from "./theme";
import { Layout } from "./components";
import { AppStyles } from "./appStyles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/servers",
    element: <Servers />,
  },
]);

const App = () => (
    <ThemeProvider theme={theme}>
        <AppStyles/>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <RouterProvider router={router} />
          </Layout>
        </QueryClientProvider>
    </ThemeProvider>
  );

export default App
