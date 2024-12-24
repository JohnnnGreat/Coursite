import GlobalErrorHandler from "./error";
import "./globals.css";

export const metadata = {
   title: "Skill Gap Assessment Tool",
   description: "A SaaS for identifying skill gaps",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <GlobalErrorHandler>
         <html lang="en">
            <body>{children}</body>
         </html>
      </GlobalErrorHandler>
   );
}
