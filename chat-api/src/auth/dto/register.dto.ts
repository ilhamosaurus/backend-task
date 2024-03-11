import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export interface RegisterDto extends z.infer<typeof RegisterSchema> {
  // username: string;
  // email: string;
  // password: string;
}
