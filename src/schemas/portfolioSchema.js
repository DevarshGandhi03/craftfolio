import { z } from "zod";

export const portfolioSchema = z.object({
  fullname: z.string().min(5, { message: "Must be 5 or more characters long" }),
  usertitle: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  userdescription: z
    .string()
    .min(20, { message: "Must be 5 or more characters long" })
    .max(100, { message: "Must be 100 or fewer characters long" }),
  projects: z
    .array(z.object())
    .min(1, { message: "Minimum 1 experience required" })
    .max(5, { message: "Maximum 5 experience can be added" }),
  jobexp: z
    .array(z.object())
    .min(1, { message: "Minimum 1 experience required" })
    .max(5, { message: "Maximum 5 experience can be added" }),
  about: z.string().min(50, { message: "Must be 50 or more characters long" }),
  github: z.string().regex(/^https:\/\/github\.com\/[a-zA-Z0-9-]+$/, {
    message: "Please enter a valid link.",
  }),
  linkedin: z
    .string()
    .regex(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$  /, {
      message: "Please enter a valid link.",
    }),
  instagram: z
    .string()
    .regex(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$  /, {
      message: "Please enter a valid link.",
    }),
  twitter: z
    .string()
    .regex(/^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$  /, {
      message: "Please enter a valid link.",
    }),
  phoneno: z
    .number()
    .min(9, { message: "Please enter a valid contact number" }),
});
