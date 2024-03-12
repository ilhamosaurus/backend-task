import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export class SignInDto {
  @ApiProperty({ example: 'test@mail.com', description: "User's email" })
  email: string;
  @ApiProperty({ example: 'supersecret', description: "User's username" })
  password: string;
}

export class ResponseSignIn {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWQiOiI2NWVlYzQzZWRiMzhjYzVmNGQzMjg0MDciLCJpYXQiOjE3MTAyMTAxOTUsImV4cCI6MTcxMDI5NjU5NX0.t25B66cUfXsoYoHPCYpBRxOKNsv_nIghwpTU6wIVGfQ',
    description: "User's access token",
  })
  token: string;
}
