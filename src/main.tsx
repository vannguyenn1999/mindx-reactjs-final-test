import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import PublicRouter from "./router/PublicRouter.tsx";
import { ListProvider } from "./core/ListContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ListProvider>
        <PublicRouter />
      </ListProvider>
    </QueryClientProvider>
  </StrictMode>,
);
