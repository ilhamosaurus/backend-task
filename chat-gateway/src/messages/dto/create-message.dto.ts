import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const CreateMessageSchema = z.object({
  message: z.string().min(1, { message: 'message is required' }),
  /**
   * @description
   * @alias to
   * using username as recipient identifier
   */
  to: z.string().min(1, { message: 'Recepient is required' }),
  from: z.string().min(1, { message: 'Sender username is required' }),
});

export class CreateMessageDto {
  @ApiProperty({ description: 'Message to be send' })
  message: string;
  @ApiProperty({ description: "Recepient's username" })
  to: string;
  @ApiProperty({ description: "Sender's Username" })
  from: string;
}

export class ResponseDto {
  @ApiProperty({ description: "Message's id" })
  id: string;
  @ApiProperty({ description: "Message's content" })
  message: string;
  @ApiProperty({ description: "Message's created date" })
  createdAt: Date;
  @ApiProperty({ description: "Message's updated date" })
  updatedAt: Date;
  @ApiProperty({ description: "Message's sender username" })
  sender: string;
  @ApiProperty({ description: "Message's receiver username" })
  receiver: string;
}
