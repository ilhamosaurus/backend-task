import { Gender } from '@prisma/client';
import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  gender: z.enum([Gender.MALE, Gender.FEMALE]),
  birthday: z.coerce.date(),
  height: z.optional(
    z.number().int({ message: 'Height must be a valid number!' }),
  ),
  weight: z.optional(
    z.number().int({ message: 'Weight must be a valid number!' }),
  ),
  interest: z.optional(z.string().array()),
});

export interface ProfileDto extends z.infer<typeof ProfileSchema> {}
