import { ApiProperty } from '@nestjs/swagger';
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

export class updateProfileDto {
  @ApiProperty({ example: 'test', description: "User's name for Profile" })
  name: string | undefined;
  @ApiProperty({
    enum: [Gender.MALE, Gender.FEMALE],
    description: "User's gender",
  })
  gender: Gender;
  @ApiProperty({ example: '1999-09-09', description: "User's Birthdate" })
  birthday: Date;
  @ApiProperty({ example: 180, description: "User's height" })
  height: number | undefined;
  @ApiProperty({ example: 70, description: "User's weight" })
  weight: number | undefined;
  @ApiProperty({
    example: ['music', 'paint', 'cycling'],
    description: "User's interest",
  })
  interest: string[] | undefined;
}
