// app/error.tsx
"use client";

import { ErrorBoundary } from "react-error-boundary";

const ErrorPage = ({ error }: { error: Error }) => {
   return (
      <div>
         <h1>Something went wrong!</h1>
         <p>{error.message}</p>
         <button onClick={() => (window.location.href = "/")}>Go Back to Home</button>
      </div>
   );
};

const GlobalErrorHandler = ({ children }: { children: React.ReactNode }) => (
   <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
);

export default GlobalErrorHandler;
