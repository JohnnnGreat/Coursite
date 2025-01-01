"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const ErrorPageContent = () => {
   const searchParams = useSearchParams();
   const error = searchParams.get("error"); // Capture error from URL query params

   return (
      <div>
         <h1>Authentication Error</h1>
         <p>
            {error
               ? `An error occurred during authentication: ${error}`
               : "An unknown error occurred."}
         </p>
         <button onClick={() => (window.location.href = "/")}>Go Back to Home</button>
      </div>
   );
};

const ErrorPage = () => (
   <Suspense fallback={<div>Loading...</div>}>
      <ErrorPageContent />
   </Suspense>
);

export default ErrorPage;
