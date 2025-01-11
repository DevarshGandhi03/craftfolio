import {z} from "zod"

export const signUpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email adderess" }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please enter a valid email adderess"),
  });
  