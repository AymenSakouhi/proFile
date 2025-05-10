import { z } from 'zod'

export const collectionSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(10)
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: 'Only letters and numbers are allowed. No symbols.',
    }),
})
