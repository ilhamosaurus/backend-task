import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export interface SignInDto extends z.infer<typeof SignInSchema> {}
