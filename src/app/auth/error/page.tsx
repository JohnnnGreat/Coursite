// app/auth/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
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

export default ErrorPage;
