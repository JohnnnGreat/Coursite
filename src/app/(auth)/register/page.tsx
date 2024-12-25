import RegisterComponent from "@/components/Auth/RegisterComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
   title: "Register | Coursite",
};

const RegisterPage = async () => {
   const session = await getServerSession();

   if (session?.user) {
      redirect("/dashboard");
   }
   return <RegisterComponent />;
};

export default RegisterPage;
