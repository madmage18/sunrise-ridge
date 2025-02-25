import { z, ZodSchema } from "zod";

// used to validata create product form action in /utils/actions/ts
export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(100, {
      message: "Name must be less than 100 characters.",
    }),
  company: z.string().min(4),
  // retest below
  // type: z.enum(['dairy', 'eggs', 'flowers'
  //   type: z.enum([
  //     "subscription",
  //     "product",
  //     "ticket",
  //     "appointmentRequiredTicket",
  //   ]),
  //   productCategory: z.enum(["eggs", "dairy", "flowers"]),
  experience: z.coerce.boolean(),
  siteSpecial: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "Price must be a positive number.",
  }),
  //   image: "/images/vercel.svg",
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "Description must be between 10 and 1000 words.",
    }
  ),
  shortDescription: z.string().refine(
    (shortDescription) => {
      const wordCount = shortDescription.split(" ").length;
      return wordCount >= 2 && wordCount <= 30;
    },
    {
      message: "Short description must be between 2 and 40 words.",
    }
  ),
  // .coerce turns the type into the type it specifies
  featured: z.coerce.boolean(),
  //   clerkId: user.id,
});

// helper function. custom verion of safeParse zod method.
export function 
validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024; // 1MB
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
