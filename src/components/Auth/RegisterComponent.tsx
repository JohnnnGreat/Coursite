"use client";
import { getSession, signIn } from "next-auth/react";
import { z } from "zod";
import { registerSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import userState from "@/actions/userActions";

export interface ISession {
   name?: string | undefined;
   image?: string;
   id?: string;
   email?: string;
   emailVerified?: Date;
}
/*
   REGISTER COMPONENT
*/
function RegisterComponent() {
   const registerForm = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });

   /* GOOGLE HANDLER */
   const handleGoogleLogin = () => {
      signIn("google", { callbackUrl: "/dashboard" });
   };

   /* CREDENTIALS HANDLER */
   async function onSubmit(values: z.infer<typeof registerSchema>) {
      const response = await signIn("credentials", {
         redirect: false,
         name: values.name,
         email: values.email,
         password: values.password,
         isSignup: true,
      });

      console.log(response);
   }
   return (
      <div className="h-screen flex items-center justify-center">
         <div className="w-[600px]">
            <h1 className="text-[3rem] font-bold">Welcome to Coursite!</h1>
            <p className="text-[#000]/70">
               Create your account and unlock a world of possibilities.
            </p>

            <Form {...registerForm}>
               <form onSubmit={registerForm.handleSubmit(onSubmit)}>
                  <FormField
                     control={registerForm.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="John Doe"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={registerForm.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="johndoe@gmail.com"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={registerForm.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="password"
                                 className="mt-[1rem] p-[1.2rem!important]"
                                 type="password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button
                     type="submit"
                     className="mt-[1rem]"
                  >
                     Submit
                  </Button>
                  <div className="flex gap-[1rem] items-center my-[2rem]">
                     <div className="w-[100%] h-[1px] bg-[#000]/20"></div>
                     <p>OR</p>
                     <div className="w-[100%] h-[1px] bg-[#000]/20"></div>
                  </div>
                  <div className="w-full flex items-center justify-center">
                     <button
                        onClick={handleGoogleLogin}
                        className="border border-gray-100 flex w-full items-center justify-center gap-[1rem] rounded-[10px] p-[.7rem]"
                     >
                        <FcGoogle className="size-8" />
                        <p>Continue with Google</p>
                     </button>
                  </div>
               </form>
            </Form>
            <div className="mt-[1rem] text-center">
               {" "}
               <h1 className="font-bold">Already have an account?</h1>
               <p>
                  <Link
                     className="underline hover:decoration-transparent"
                     href="/register"
                  >
                     Sign in here
                  </Link>{" "}
                  to access your account and continue where you left off
               </p>
               <p>By registering, you agree to our [Terms of Service] and [Privacy Policy].</p>
            </div>
         </div>
      </div>
   );
}

export default RegisterComponent;
