"use client";
import { getSession, signIn } from "next-auth/react";
import { z } from "zod";
import { loginSchema } from "@/lib/schema";
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
import { ISession } from "./RegisterComponent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

interface ILoginResponse {
   user: ISession;
}
/*
   LOGIN COMPONENT
*/
function LoginPage() {
   const [isLoading, setIsLoading] = useState(false);
   const login = userState((state) => state?.login);
   const router = useRouter();
   const loginForm = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const [googleLoading, setGoogleLoading] = useState(false);

   /* GOOGLE HANDLER */
   const handleGoogleLogin = async () => {
      console.log("this is called");
      setGoogleLoading(true);
      const res = await signIn("google", { callbackUrl: "/dashboard" });

      const session = await getSession();
      const userInformation = session as any;

      // Prepare userinformation to be store in the zustand
      const userPayload = {
         ...userInformation?.user,
      };

      login(userPayload);
      console.log("respons", res);
      setGoogleLoading(true);
      console.log("this is called end");
   };

   /* CREDENTIALS HANDLER */
   async function onSubmit(values: z.infer<typeof loginSchema>) {
      setIsLoading(true);
      const result = await signIn("credentials", {
         redirect: false,
         email: values.email,
         password: values.password,
         isSignup: false,
      });

      if (!result?.ok) {
         toast.error(result?.error);
      } else {
         toast.success("Login Successfull");
      }

      const session = await getSession();
      const userInformation = session as any;

      // Prepare userinformation to be store in the zustand
      const userPayload = {
         ...userInformation?.user,
      };

      login(userPayload);
      router.push("/dashboard");
      setIsLoading(false);
   }
   return (
      <div className="h-screen flex items-center justify-center p-4">
         <div className="w-full md:w-[500px]">
            <h1 className="text-[3rem] font-bold">Welcome Back!</h1>
            <p className="text-[#000]/70">
               We're glad to have you back. Sign in to continue where you left off.
            </p>

            <Form {...loginForm}>
               <form onSubmit={loginForm.handleSubmit(onSubmit)}>
                  <FormField
                     control={loginForm.control}
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
                     control={loginForm.control}
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
                     className="mt-4 w-full"
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <div className="flex gap-2 items-center">
                           <Loader2 className="animate-spin" />
                           Please wait...
                        </div>
                     ) : (
                        "Login"
                     )}
                  </Button>
                  <div className="flex gap-[1rem] items-center my-[2rem]">
                     <div className="w-[100%] h-[1px] bg-[#000]/20"></div>
                     <p>OR</p>
                     <div className="w-[100%] h-[1px] bg-[#000]/20"></div>
                  </div>
                  <div className="w-full flex items-center justify-center">
                     <button
                        type="button"
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
               <h1 className="font-bold">New to our platform?</h1>
               <p>
                  <Link
                     className="underline hover:decoration-transparent"
                     href="/register"
                  >
                     Create an Account
                  </Link>{" "}
                  and join today to start your journey
               </p>
            </div>
         </div>
      </div>
   );
}

export default LoginPage;
