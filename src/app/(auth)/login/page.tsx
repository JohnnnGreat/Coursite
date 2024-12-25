import LoginComponent from "@/components/Auth/LoginComponent";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
   title: "Login | Coursite",
};

const LoginPage = async () => {
   const session = await getServerSession();

   if (session?.user) {
      redirect("/dashboard");
   }
   return <LoginComponent />;
};

export default LoginPage;
