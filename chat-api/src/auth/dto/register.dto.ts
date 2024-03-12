import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export class RegisterDto {
  @ApiProperty({ example: 'test', description: "User's username" })
  username: string;
  @ApiProperty({ example: 'test@mail.com', description: "User's email" })
  email: string;
  @ApiProperty({ example: 'supersecret', description: "User's password" })
  password: string;
}

export class dataDto {
  @ApiProperty({ example: '', description: "User's Id" })
  id: string;
  @ApiProperty({ example: 'test', description: "User's username" })
  username: string;
  @ApiProperty({ example: 'test@mail.com', description: "User's email" })
  email: string;
}

export class RegisterResponse {
  @ApiProperty({ example: 'User created', description: 'message for frontend' })
  message: string;
  @ApiProperty({
    type: dataDto,
  })
  data: dataDto;
}
