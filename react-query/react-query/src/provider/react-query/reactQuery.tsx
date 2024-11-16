"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

const ReactQuery = ({ children }: { children: ReactNode }) => {
  const reactQuery = new QueryClient();

  return (
    <>
      <QueryClientProvider client={reactQuery}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
};

export default ReactQuery;
