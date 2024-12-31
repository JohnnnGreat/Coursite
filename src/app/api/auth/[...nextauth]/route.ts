import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Profile, Account } from "next-auth";
import { User, UserRole } from "@/schema/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import connectDB from "@/lib/mongodb";

console.log("token", process.env.NEXTAUTH_SECRET);

// Type declarations
declare module "next-auth" {
   interface Session {
      user: {
         id: string;
         name?: string | any;
         email?: string | any;
         image?: string | any;
         role?: UserRole | any;
      };
   }

   interface User {
      role?: UserRole;
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      role?: UserRole;
   }
}

// Ensure database connection
await connectDB();

export const authOptions: NextAuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
               response_type: "code",
            },
         },
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
            name: { label: "Name", type: "text" },
            isSignup: { label: "Is Signup", type: "text" },
         },
         async authorize(credentials) {
            try {
               if (!credentials?.email || !credentials?.password) {
                  throw new Error("Missing credentials");
               }

               const isSignup = credentials.isSignup === "true";

               if (isSignup) {
                  // Registration logic
                  const existingUser = await User.findOne({ email: credentials.email });

                  if (existingUser) {
                     throw new Error("Email already registered");
                  }

                  if (!credentials.name) {
                     throw new Error("Name is required for registration");
                  }

                  const hashedPassword = await bcrypt.hash(credentials.password, 10);
                  const newUser = await User.create({
                     email: credentials.email,
                     password: hashedPassword,
                     name: credentials.name,
                     role: UserRole.STUDENT,
                     authMethod: "CREDENTIALS",
                  });

                  return {
                     id: newUser._id.toString(),
                     name: newUser.name,
                     email: newUser.email,
                     role: newUser.role,
                     image: newUser.image,
                  };
               } else {
                  // Login logic
                  const user = await User.findOne({ email: credentials.email });

                  if (!user) {
                     throw new Error("User not found");
                  }

                  if (!user.password) {
                     throw new Error("Please use Google login");
                  }

                  const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                  if (!isPasswordValid) {
                     throw new Error("Invalid password");
                  }

                  return {
                     id: user._id.toString(),
                     name: user.name,
                     email: user.email,
                     role: user.role,
                     image: user.image,
                  };
               }
            } catch (error: any) {
               console.error("Auth error:", error);
               throw new Error(error.message || "Authentication failed");
            }
         },
      }),
   ],
   callbacks: {
      async signIn({ user, account }) {
         if (account?.provider === "google") {
            try {
               const existingUser = await User.findOne({ email: user.email });

               if (!existingUser) {
                  await User.create({
                     email: user.email,
                     name: user.name,
                     image: user.image,
                     role: UserRole.STUDENT,
                     emailVerified: new Date(),
                     authMethod: "GOOGLE",
                  });
               }
               return true;
            } catch (error) {
               console.error("Google sign-in error:", error);
               return false;
            }
         }
         return true;
      },

      async jwt({ token, user }) {
         if (user) {
            token.role = user.role;
         }

         // If user exists in database, get latest role
         if (token.email) {
            const dbUser = await User.findOne({ email: token.email });
            if (dbUser) {
               token.role = dbUser.role;
            }
         }

         return token;
      },

      async session({ session, token, user }) {
         if (token.sub) {
            session.user.id = token.sub;
         }
         if (token.role) {
            session.user.role = token.role;
         }

         session.user = {
            ...session.user,
            id: token.sub || "",
            role: token?.role || "STUDENT",
            // Add any other fields you need
            name: token.name,
            email: token.email,
         };
         return session;
      },
   },
   pages: {
      signIn: "/login",
      error: "/auth/error",
   },
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET as string,
   // Add proper error handling
   debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
