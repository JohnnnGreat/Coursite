import { z } from "zod";

export const loginSchema = z.object({
   email: z.string().min(2).max(50),
   password: z.string().min(8).max(50),
});

export const registerSchema = z.object({
   name: z.string().min(4).max(50),
   email: z.string().min(2).max(50),
   password: z.string().min(8).max(50),
});

export const prerequisiteSchema = z.object({
   prerequisite: z
      .string()
      .min(5, { message: "Preriquites must be at least 5 length of characters" })
      .refine((password) => console.log("re", password)),
});
