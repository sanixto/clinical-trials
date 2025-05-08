import { z } from "zod";

export interface ApplicationFormValidation {
  numberOfCritetias: number;
  minAge?: number;
  maxAge?: number;
}

export function createApllicationSchema({
  numberOfCritetias,
  minAge = 1,
  maxAge = 100,
}: ApplicationFormValidation) {
  return z.object({
    age: z.coerce
      .number()
      .min(minAge, `Minimum age is ${minAge}`)
      .max(maxAge, `Maximum age is ${maxAge}`),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, {
      message: "ZIP code must be in 12345 or 12345-6789 format",
    }),
    conditions: z
      .union([z.string(), z.array(z.string())])
      .transform((val) => (typeof val === "string" ? [val] : val))
      .refine((arr) => arr.length > 0, {
        message: "At least one condition must be selected",
      }),
    location: z.string().min(1, "Location must be selected"),
    criterias: z
      .array(z.string())
      .min(numberOfCritetias, "All criterias must be selected"),
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters"),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s\-]{7,20}$/, "Enter a valid phone number"),
    email: z.string().trim().email("Enter a valid email address"),
    privacyPolicy: z.literal("true", {
      errorMap: () => ({ message: "You must agree to the Privacy Policy" }),
    }),
    recieveEmail: z.coerce.boolean().optional(),
  });
}
