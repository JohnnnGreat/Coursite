import { NextAuthOptions, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";
import { Profile, Account } from "next-auth";
import { User, UserRole } from "@/schema/User";
import connectDB from "./mongodb";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

// Extend default types to include our custom fields

declare module "next-auth" {
   interface Session {
      user: {
         id: string;
         name?: string;
         email?: string;
         image?: string;
         role?: UserRole;
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

connectDB();
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
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            console.log(credentials);
            // Check if credentials exist
            if (!credentials?.email || !credentials?.password) {
               return null;
            }

            try {
               // Find user by email
               const user = await User.findOne({ email: credentials.email });

               // If no user found
               if (!user) {
                  return null;
               }

               // Check password
               const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

               // If password is incorrect
               if (!isPasswordCorrect) {
                  return null;
               }

               // Return user object if authentication successful
               return {
                  id: user._id.toString(),
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  image: user.image,
               };
            } catch (error) {
               console.error("Authentication error:", error);
               return null;
            }
         },
      }),
   ],
   callbacks: {
      // Customize user creation/sync with your Mongoose User model
      async signIn({ user, account }: { user: Profile; account: Account | null }) {
         console.log(user, account);
         // Type-safe check for Auth0 provider
         if (account?.provider === "google") {
            try {
               // Find or create user in your MongoDB
               const existingUser = await User.findOne({
                  email: user.email,
               });

               if (!existingUser) {
                  // Create new user if not exists
                  const newUser = new User({
                     name: user.name,
                     email: user.email,
                     image: user.image,
                     role: UserRole.STUDENT, // Default role
                     emailVerified: new Date(),
                  });

                  await newUser.save();
               }

               return true;
            } catch (error) {
               console.error("User sync error:", error);
               return false;
            }
         }

         return true;
      },
      // Extend session to include custom information
      async session({ session, token }) {
         // Add user ID to session
         if (token.sub) {
            session.user.id = token.sub;
         }

         // Add role to session
         if (token.role) {
            session.user.role = token.role;
         }

         return session;
      },
      // Customize token to include additional information
      async jwt({ token, user }) {
         // Add role to token on user creation/first sign in
         if (user) {
            token.role = (user as any).role || UserRole.STUDENT;
         }

         return token;
      },
   },
   // Configure pages
   pages: {
      signIn: "/login",
      error: "/auth/error",
   },
   // Security configurations
   session: {
      strategy: "jwt",
   },
   // Enable debug in development
   debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
