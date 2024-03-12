import { ApiProperty } from '@nestjs/swagger';
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

export class ProfileDto {
  @ApiProperty({ example: 'test', description: "User's name for Profile" })
  name: string;
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
  interest: string[];
}

export class ResponseCreate {
  @ApiProperty({
    example: '65efc285fb8fec1145a32e81',
    description: "Profile's id",
  })
  id: string;
  @ApiProperty({ example: 'test', description: "Profile's name" })
  name: string;
  @ApiProperty({ example: 'MALE', description: "Profile's Gender" })
  gender: Gender;
  @ApiProperty({
    example: '1996-10-23T00:00:00.000Z',
    description: "User's Birthdate",
  })
  birthday: string;
  @ApiProperty({ description: "Profile's photoKey" })
  photoKey: string | null;
  @ApiProperty({ description: "Profile's Photo url" })
  photoUrl: string | null;
  @ApiProperty({ description: "User's horoscope based on birthday" })
  horosccope: string;
  @ApiProperty({ description: "USer's zodiac based on Birthdate" })
  zodiac: string;
  @ApiProperty({ description: "User's Height" })
  height: number;
  @ApiProperty({ description: "USer's weight" })
  weight: number;
  @ApiProperty({ description: "Profile's created time" })
  createdAt: string;
  @ApiProperty({ description: "Profile's updated time" })
  updatedAt: string;
  @ApiProperty({ description: "Profile's user id" })
  userId: string;
  @ApiProperty({ description: "User's interest" })
  interest: string[];
}
