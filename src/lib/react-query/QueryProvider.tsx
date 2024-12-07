import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const showReactDevTools = import.meta.env.VITE_SHOW_REACT_DEV_TOOLS;
const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  if (!showReactDevTools) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
        {showReactDevTools && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }
};
