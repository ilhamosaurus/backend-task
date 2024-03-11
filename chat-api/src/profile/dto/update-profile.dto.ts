import { Gender } from '@prisma/client';
import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.optional(z.string()),
  gender: z.enum([Gender.MALE, Gender.FEMALE]),
  birthday: z.optional(z.coerce.date()),
  height: z.optional(
    z.number().int({ message: 'Height must be a valid number!' }),
  ),
  weight: z.optional(
    z.number().int({ message: 'Weight must be a valid number!' }),
  ),
  interest: z.optional(z.string().array()),
});

export interface updateProfileDto extends z.infer<typeof UpdateProfileSchema> {}
