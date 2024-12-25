import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { ComponentType } from "react";

const WithAuth = (Component: ComponentType) => {
   return async (props: any) => {
      const session = await getSession();
      if (session) {
         return <Component {...props} />;
      } else {
         return redirect("/login");
      }
   };
};

export default WithAuth;
